const { BrowserWindow, app, ipcMain, dialog } = require("electron");

if (handleStartupEvent()) {
	process.exit();
}

function handleStartupEvent() {
	if (process.platform !== "win32") {
		return false;
	}
	const squirrelCommand = process.argv[1];
	switch (squirrelCommand) {
		case "--squirrel-install":
		case "--squirrel-updated":
			// Optionally do things such as:
			//
			// - Install desktop and start menu shortcuts
			// - Add your .exe to the PATH
			// - Write to the registry for things like file associations and
			//   explorer context menus
			// Always quit when done
			app.quit();
			return true;
		case "--squirrel-uninstall":
			// Undo anything you did in the --squirrel-install and
			// --squirrel-updated handlers
			// Always quit when done
			app.quit();
			return true;
		case "--squirrel-obsolete":
			// This is called on the outgoing version of your app before
			// we update to the new version - it's the opposite of
			// --squirrel-updated
			app.quit();
			return true;
	}
}

app.setName("Schema Designer");

app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

function createWindow() {
	const win = new BrowserWindow({
		width: 1280,
		height: 768,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	win.loadFile("build/index.html");

	win.on("maximize", () => {
		win.webContents.send("main:maximize");
	});

	win.on("unmaximize", () => {
		win.webContents.send("main:unmaximize");
	});

	ipcMain.on("app:ismaximized", () => {
		win.webContents.send("main:ismaximized", win.isMaximized());
	});

	ipcMain.on("app:minimize", () => {
		win.minimize();
	});

	ipcMain.on("app:maximize", () => {
		if (win.isMaximized()) {
			win.unmaximize();
		} else {
			win.maximize();
		}
	});

	ipcMain.on("app:close", () => {
		console.log("marker");
		win.close();
	});

	ipcMain.on("app:open", async () => {
		const { filePaths } = await dialog.showOpenDialog({
			properties: ["openFile"],
			filters: [{ name: "Form Builder Project", extensions: ["json"] }],
		});
		if (filePaths.length === 0) {
			return;
		}
		win.webContents.send("main:open", filePaths[0]);
	});

	ipcMain.on("app:save", async () => {
		win.webContents.send("main:save");
	});

	ipcMain.on("app:saveAs", async () => {
		const { filePath } = await dialog.showSaveDialog({
			filters: [{ name: "Form Builder Project", extensions: ["json"] }],
		});
		if (filePath === "") {
			return;
		}
		win.webContents.send("main:saveAs", filePath);
	});
}
