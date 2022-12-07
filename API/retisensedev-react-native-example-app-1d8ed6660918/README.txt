THIS IS A REACT NATIVE FRAMEWORK PROJECT.
-----------------------------------------------
Make sure you have your react native environment setup.
-----------------------------------------------

STEPS for using this demo project
----------------------------------------
Step1: Install node packages by using the command inside the project folder.
	>npm install
    
    This will install all the packages used.

Step2: Make sure react natvie cli is installed along with Android studio for building the app.
	if everything is install and working then run the following command.
		>npx react-native run-android

	This will build and run the android project so make sure you have your android phone connected. 
    You can also run and build using an android emulator.

Step3: Once the app is build and running, it will open up browser window for debugging. If not then,
    Press 'd' in newly opened metro console window, it will open react dev Menu on the app. 
    select debug option using brower.

Step4: In browser, on react debugger window, press crtl+shift+j to open the dev tools.
    You can check all the logs in the console window.

Step5: The app will automatically starts scanning for devices. You can see scanned devices in the console window.
        Pressing the "connect" button will connect to the first device.
        Pressing the "start/stop notification" will start and stop the notifications.

        All the device information will be on the console window.
        To disconnect the device, turn off/On bluetooth.
