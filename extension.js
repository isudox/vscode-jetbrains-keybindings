// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')

const showInformationMessage = vscode.window.showInformationMessage
const isGlobalConfigValue = true

class Setting {
  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

const versionThreeSettings = [
  new Setting('multiCursorModifier', 'ctrlCmd'),
  new Setting('formatOnPaste', true)
]

function updateSettings(editorConfig, settings) {
  settings.forEach((setting) => {
    editorConfig.update(setting.name, setting.value, isGlobalConfigValue)
  })
}

function isDefaultValueSet(editorConfig, settings) {
  for (var i = 0; i < settings.length; i++) {
    var setting = editorConfig.inspect(settings[i].name)
    const dv = setting ? setting.defaultValue : null
    const gv = setting ? setting.globalValue : null

    if (gv === dv || gv === undefined) {
      return true
    }
  }

  return false
}

class VersionThreeUpdateSetting {
  constructor() {
    this.name = 'promptV3Features'
    this.config = vscode.workspace.getConfiguration('jetbrainsKeymap')
    this.hasPrompted = this.config.get(this.name) || false
  }

  persist() {
    this.config.update(this.name, true, isGlobalConfigValue)
  }
}

class View {
  constructor(updateSetting, editorConfig) {
    this.updateSetting = updateSetting
    this.editorConfig = editorConfig
    this.messages = {
      yes: 'Yes',
      no: 'No',
      learnMore: 'Learn More',
      prompt: 'New features are available for JetBrains Keymap. Do you want to enable the new features?',
      noChange: 'JetBrains Keymap: New features have not been enabled.',
      change: 'JetBrains Keymap: New features have been added.',
    }
  }

  showMessage() {
    const ans = showInformationMessage(this.messages.prompt, this.messages.yes, this.messages.no, this.messages.learnMore)
    ans.then((selectedOption) => {
      if (selectedOption === this.messages.yes) {
        this.updateSetting.persist()
        updateSettings(this.editorConfig, versionThreeSettings)
        showInformationMessage(this.messages.no)
      } else if (selectedOption === this.messages.no) {
        this.updateSetting.persist()
        showInformationMessage(this.messages.noChange)
      } else if (selectedOption === this.messages.learnMore) {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://marketplace.visualstudio.com/items?itemName=isudox.vscode-jetbrains-keybindings'))
      }
    })
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-jetbrains-keybindings" is now active!');

  const editorConfig = vscode.workspace.getConfiguration('editor')
  const updateSetting = new VersionThreeUpdateSetting()

  // if (!updateSetting.hasPrompted && isDefaultValueSet(editorConfig, versionThreeSettings)) {
  //   new View(updateSetting, editorConfig).showMessage()
  // }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
