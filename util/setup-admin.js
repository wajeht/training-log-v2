const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

const User = require("../src/models/user.model.js");

// check to see if admin exit or has be setup
const setUpAdminAccount = async (email) => {
  try {
    const adminExist = await User.adminExist(email);
    log(success(`Checking to see if admin account has been setup...`));

    if (!adminExist.length) {
      let message = "You have not set up an admin account yet!\n";
      message += "If you have not sign up, go ahead and make one!\n";
      message += "Then go .env file and replace admin with your email!";
      log(error(message));
      return;
    }

    const { is_admin } = adminExist[0];

    // if we already setup admin account
    // then stop the next process
    if (is_admin == true) {
      log(success(`Done!`));
      log();
      return;
    }

    log(success(`Setting up admin account for ${email}...`));
    const setAdmin = await User.setAdmin(email, true);

    if (!setAdmin) {
      log(
        error(
          `Cannot find an account with ${email},\ncheck to see if .evn and your signed up email are correct!`
        )
      );
      return;
    }

    log(success(`Done!`));
    log();
  } catch (err) {
    log(error(err));
  }
};

module.exports = {
  setUpAdminAccount,
};
