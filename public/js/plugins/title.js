/*:
* @plugindesc Modifies the Title Screen
* @author Casey Tucker
*/  

(function() {

    TextManager.login = "Login";
    TextManager.register = "Register";

    Window_TitleCommand.prototype.makeCommandList = function() {
        const continueEnabled = this.isContinueEnabled();
        this.addCommand(TextManager.login, "login");
        this.addCommand(TextManager.register, "register");
        this.addCommand(TextManager.options, "options");
    };


    Scene_Title.prototype.createCommandWindow = function() {
        const background = $dataSystem.titleCommandWindow.background;
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_TitleCommand(rect);
        this._commandWindow.setBackgroundType(background);
        this._commandWindow.setHandler("login", this.commandNewGame.bind(this));
        this._commandWindow.setHandler("register", this.commandContinue.bind(this));
        this._commandWindow.setHandler("options", this.commandOptions.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_Title.prototype.commandNewGame = function() {
        DataManager.setupNewGame();
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

})();