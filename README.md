# JetBrains IDE Keymap for Visual Studio Code.

Inspired by Microsoft vscode-sublime-keybindings. 

This extension ports the most popular IDE of JetBrains keymap to VS Code. After installing the extension and restarting VS Code your keymap from JetBrains are now available.

This keymap has covered most of keyboard shortcuts of VS Code, and makes VS Code more 'JetBrains IDE like'.

But this extension hasn't transfer all keybindings of JetBrains yet. If you want more feature, go to [GitHub Issues](https://github.com/isudox/vscode-jetbrains-keybindings/issues) and make it more effective for your developement.

All of the customed keymap in this extension is configured in `./package.json` file. You can add or modify keymap configuraions as seen below.

```json
{
    "mac": "<keyboard shortcut for mac>",
    "linux": "<keyboard shortcut for linux",
    "win": "<keyboard shortcut for windows",
    "key": "<default keyboard shortcut>",
    "command": "<name of the command in VS Code"
}
```

You can read more about how to contribute keybindings in extensions in the [official documentation](http://code.visualstudio.com/docs/extensionAPI/extension-points#_contributeskeybindings). 

## License
[MIT](LICENSE)
