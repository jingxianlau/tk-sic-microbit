/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

// bluetooth
let connected = false

// Simulation
let simLightIntensity = 0
let simHumidity = 0
let simMoisture = 0
let simTemperature = 0

// UI 
let UIActive = false
let data = ""
let newVal = false
let modeIndex = 0
let list: string[] = ['0', '0', '0', '0']
let inMenu = true
let mode = [
    "L",
    "H",
    "M",
    "T"
]

// helper functions for error handling
function checkValues() {
    for (let index = 0; index <= 3; index++) {
        if (parseFloat(list[index]) < 0 || parseFloat(list[index]) > 100) {
            return false
        }
    }
    return true
}

let start = false
function simStarted() {
    if (!start) {
        basic.showString("Err: sim not started")
        basic.showIcon(IconNames.Sad)
        return false
    } else if (!connected) {
        basic.showString("Err: bluetooth disconnected")
        return false
    }
    return true
}


/**
 * Custom blocks
 */
//% weight=150 color=#f09b24 icon=""
namespace simulation {

    /**
     * Connects micro:bit to simulation
     */
    //% block
    export function startSimulation() {
        bluetooth.startUartService()
        start = true
    }

    /**
     * Initialises default UI
     */
    //% block
    export function useDefaultUi() {
        if (!start) return 
        UIActive = true
    }

    /**
     * Value from 0-100 representing the light intensity of the simulation
     */
    //% block
    export function lightIntensity() {
        return simLightIntensity
    }

    /**
     * Value from 0-100 representing the humidity of the simulation
     */
    //% block
    export function humidity() {
        return simHumidity
    }

    /**
     * Value from 0-100 representing the soil moisture of the simulation
     */
    //% block
    export function soilMoisture() {
        return simMoisture
    }

    /**
     * Value from 0-100 representing the temperature of the simulation
     */
    //% block
    export function temperature() {
        return simTemperature
    }

    /**
     * Sets the brightness of the light bulb
     * @param num from 0-100 representing the brightness of the bulb, eg: 100
     */
    //% block
    export function setLightBulb(num: number) {
        if (!simStarted()) return

        if (num >= 0 && num <= 100) {
            bluetooth.uartWriteString("0;" + convertToText(num))
        }
    }

    /**
     * Turns the humidifier on or off
     * @param num representing the dehumidifier/off/humidifier state, eg: 1
     */
    //% block
    export function setDehumidifier(bool: boolean) {
        if (!simStarted()) return
        bluetooth.uartWriteString("1;" + bool)
    }

    /**
     * Turns the water pump on or off
     * @param bool representing the on/off state, eg: true
     */
    //% block
    export function setWaterPump(bool: boolean) {
        if (!simStarted()) return

        bluetooth.uartWriteString("2;" + bool)
    }

    /**
     * Turns the heater on or off
     * @param num representing the cooler/off/heater state, eg: 1
     */
    //% block
    export function setHeater(bool: boolean) {
        if (!simStarted()) return;
        bluetooth.uartWriteString("3;" + bool)
    }
    

    // UI Functions
    input.onButtonPressed(Button.A, function () {
        if (!UIActive || !connected) return;

        if (inMenu) {
            modeIndex = Math.max(0, modeIndex - 1)
        } else {
            newVal = true
        }
    })

    input.onButtonPressed(Button.B, function () {
        if (!UIActive || !connected) return;

        if (inMenu) {
            modeIndex = Math.min(3, modeIndex + 1)
        } else {
            newVal = false
        }
    })

    input.onButtonPressed(Button.AB, function () {
        if (!UIActive || !connected) return;

        if (inMenu) {
            inMenu = false
            newVal = true
        } else {
            if (modeIndex == 0) {
                if (newVal) {
                    setLightBulb(100)
                } else {
                    setLightBulb(0)
                }
            } else if (modeIndex == 1) {
                setDehumidifier(newVal)
            } else if (modeIndex == 2) {
                setWaterPump(newVal)
            } else if (modeIndex == 3) {
                setHeater(newVal)
            }
            inMenu = true
        }
    })

    input.onGesture(Gesture.Shake, function () {
        if (!UIActive || !connected) return;

        if (inMenu) {
            led.plotBarGraph(
                parseFloat(list[modeIndex]),
                100
            )
        } else {
            if (modeIndex == 0) {
                if (newVal) {
                    setLightBulb(100)
                } else {
                    setLightBulb(0)
                }
            } else if (modeIndex == 1) {
                setDehumidifier(newVal)
            } else if (modeIndex == 2) {
                setWaterPump(newVal)
            } else if (modeIndex == 3) {
                setHeater(newVal)
            }
            inMenu = true
        }
    })

    basic.forever(function () {
        if (!UIActive || !connected) return;

        if (inMenu) {
            basic.showString("" + (mode[modeIndex]))
        } else {
            if (newVal) {
                basic.showIcon(IconNames.Yes)
            } else {
                basic.showIcon(IconNames.No)
            }
        }
    })

    // Bluetooth Functions
    basic.showLeds(`
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
    `)

    bluetooth.onBluetoothConnected(() => {
        basic.showIcon(IconNames.Happy)
        basic.pause(1000)
        connected = true
    })

    bluetooth.onBluetoothDisconnected(() => {
        connected = false
        basic.showIcon(IconNames.Sad)
        basic.pause(1000)
        basic.showLeds(`
            . . # # .
            # . # . #
            . # # # .
            # . # . #
            . . # # .
        `)
    })

    bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
        data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        list = data.split(";")
        if (checkValues()) {
            simLightIntensity = parseFloat(list[0])
            simHumidity = parseFloat(list[1])
            simMoisture = parseFloat(list[2])
            simTemperature = parseFloat(list[3])
        }
    })
}
