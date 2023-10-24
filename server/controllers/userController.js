const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const nodemailer = require("nodemailer")
const { transporter } = require("../helpers/nodemailer");
const { hash, compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const { uuid } = require("uuidv4");
const sendVerificationEmail = require("../helpers/sendEmail");

class userController {
  static async registerUser(req, res, next) {
    try {
      const { email, username, password } = req.body;

      let data = {
        email: email,
        username: username,
        password: password,
        pending: true,
      };
      data.password = hash(data.password);

      // if success
      const response = await prisma.user.create({
        data,
      });

      const uniqueString = uuid() + response.id;
      const mailOptions = sendVerificationEmail(response, res, uniqueString);

      const hashedUnique = hash(uniqueString);

      let currentDate = new Date();
      let numberOfMlSeconds = currentDate.getTime();
      let addMlSeconds = 6 * 360000;
      let expireDate = new Date(numberOfMlSeconds + addMlSeconds);

      await prisma.userVerification.create({
        data: {
          userId: response.id,
          uniqueString: hashedUnique,
          createdAt: currentDate,
          expiresAt: expireDate,
        },
      });

      transporter.sendMail(mailOptions);

      // console.log(response, "ini response register");
      res.status(202).json({
        status: "Pending",
        message: "Verification email sent",
      });
    } catch (err) {
      next(err);
    }
  }

  static async verifyRegistration(req, res, next) {
    //pas ngeklik link verify
    try {
      let { userId, uniqueString } = req.params;

      const checkUser = await prisma.userVerification.findMany({
        where: {
          userId: userId,
        },
      });

      if (checkUser.length == 0) {
        // res.redirect(`/user/verified?error=true&message=${message}`)
        throw new Error("VERIFYUSER_NOT_FOUND");
      }
      // kalo berhasil
      const { expiresAt } = checkUser[0];
      // console.log(userId, "ini userId");
      // console.log(expiresAt, "ini expires at");
      // console.log(new Date(), "ini date");
      let theUserId = userId;
      if (expiresAt < new Date()) {
        const resDelete = await prisma.userVerification.delete({
          where: {
            userId: theuserId,
          },
          select: {
            userId: true,
          },
        });

        const { userId } = resDelete;

        await prisma.user.delete({
          where: {
            id: userId,
          },
        });

        res.status(410).json({
          message:
            "Verification link has expired. Please try registering again.",
        });
      }
      //kalau tidak ada yang error

      const hashedUniqueString = checkUser[0].uniqueString;
      if (!compare(uniqueString, hashedUniqueString)) {
        throw new Error("MISMATCHED_UNIQUE");
      }

      const resUpdateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          pending: false,
        },
      });

      // console.log(resUpdateUser, "ini hasil update");

      const toDelete = await prisma.userVerification.findMany({
        where: {
          userId: theUserId,
        },
      });

      const toDeleteId = toDelete[0].id;

      const resDelVerUser = await prisma.userVerification.delete({
        where: {
          id: toDeleteId,
        },
      });

      // console.log(resDelVerUser, "ini hasil del veri user");
      res.status(200).json({
        message: "Verify successful, you may try to log in",
      });
    } catch (err) {
      // nanti pindahin ke errorHandler
      if (err.message == "VERIFYUSER_NOT_FOUND") {
        res.status(400).json({
          message:
            "Account not found, it might already be verified or doesn't exist.",
        });
      }
      // console.log(err, "ini error pas verify");
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("LOGIN_ERROR");
      }

      const foundUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (foundUser.length == 0) {
        throw new Error("LOGIN_NOT_FOUND");
      }

      if (foundUser.pending == true) {
        throw new Error("HAVENOT_VERIFY");
      }

      if (!compare(password, foundUser.password)) {
        throw new Error("LOGIN_NOT_FOUND");
      }

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
      };

      const clientToken = createToken(payload);
      res.status(200).json({
        access_token: clientToken,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
