/*:
* @plugindesc Adds Login, Logout, Register Options
* @author Casey Tucker
*/

(function () {

    TextManager.login = "Login";
    TextManager.register = "Register";
    TextManager.logout = "Logout"

    //Entry Screen Command List
    Window_TitleCommand.prototype.makeCommandList = function () {
        this.addCommand(TextManager.login, "login");
        this.addCommand(TextManager.register, "register");
        this.addCommand(TextManager.options, "options");
    };


    //Entry Screen
    Scene_Title.prototype.createCommandWindow = function () {
        const background = $dataSystem.titleCommandWindow.background;
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_TitleCommand(rect);
        //this._commandWindow.setBackgroundType(background);
        this._commandWindow.setHandler("login", this.commandNewGame.bind(this));
        this._commandWindow.setHandler("register", this.commandContinue.bind(this));
        this._commandWindow.setHandler("options", this.commandOptions.bind(this));
        this.addWindow(this._commandWindow);
    };

    //Menu Screen In-Game
    Scene_Menu.prototype.createCommandWindow = function () {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_MenuCommand(rect);
        commandWindow.setHandler("item", this.commandItem.bind(this));
        commandWindow.setHandler("skill", this.commandPersonal.bind(this));
        commandWindow.setHandler("equip", this.commandPersonal.bind(this));
        commandWindow.setHandler("status", this.commandPersonal.bind(this));
        commandWindow.setHandler("formation", this.commandFormation.bind(this));
        commandWindow.setHandler("options", this.commandOptions.bind(this));
        commandWindow.setHandler("save", this.commandSave.bind(this));
        commandWindow.setHandler("logout", this.commandGameEnd.bind(this));
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(commandWindow);
        this._commandWindow = commandWindow;
    };

    //Add Logout Text
    Window_MenuCommand.prototype.addGameEndCommand = function () {
        const enabled = this.isGameEndEnabled();
        this.addCommand(TextManager.logout, "logout", enabled);
    };

    //Logout Handler
    Scene_Menu.prototype.commandGameEnd = function () {
        SceneManager.push(Scene_GameEnd);
    };


    //Login Handler
    Scene_Title.prototype.commandNewGame = function () {

        this._commandWindow.close();
    };

})();