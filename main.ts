function setThermostat (bool: boolean) {
    bluetooth.uartWriteString("3;" + bool)
}
function setHumidifier (bool: boolean) {
    bluetooth.uartWriteString("1;" + bool)
}
function setLightBulb (num: number) {
    if (checkValues()) {
        bluetooth.uartWriteString("0;" + convertToText(num))
    }
}
function checkValues () {
    for (let index = 0; index <= 3; index++) {
        if (parseFloat(list[index]) < 0 || parseFloat(list[index]) > 100) {
            return false
        }
    }
    return true
}
input.onButtonPressed(Button.A, function () {
    if (inMenu) {
        modeIndex = Math.max(0, modeIndex - 1)
    } else {
        newVal = true
    }
})
function setWaterPump (bool: boolean) {
    bluetooth.uartWriteString("2;" + bool)
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    list = data.split(";")
    if (checkValues()) {
        light_intensity = parseFloat(list[0])
        humidity = parseFloat(list[1])
        moisture = parseFloat(list[2])
        temperature = parseFloat(list[3])
    }
})
input.onButtonPressed(Button.AB, function () {
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
            setHumidifier(newVal)
        } else if (modeIndex == 2) {
            setWaterPump(newVal)
        } else if (modeIndex == 3) {
            setThermostat(newVal)
        }
        inMenu = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (inMenu) {
        modeIndex = Math.min(3, modeIndex + 1)
    } else {
        newVal = false
    }
})
input.onGesture(Gesture.Shake, function () {
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
            setHumidifier(newVal)
        } else if (modeIndex == 2) {
            setWaterPump(newVal)
        } else if (modeIndex == 3) {
            setThermostat(newVal)
        }
        inMenu = true
    }
})
let temperature = 0
let moisture = 0
let humidity = 0
let light_intensity = 0
let data = ""
let newVal = false
let modeIndex = 0
let list: string[] = []
let inMenu = false
bluetooth.startUartService()
inMenu = true
let mode = [
"L",
"H",
"M",
"T"
]
basic.forever(function () {
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
