function arranca () {
    velocidad = 30
    luces = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    luces.showColor(neopixel.colors(NeoPixelColors.Purple))
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    music.playMelody("A B A G A B A G ", 426)
}
function para () {
    maqueen.motorStop(maqueen.Motors.All)
    velocidad = 0
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "arranca") {
        arranca()
    } else if (receivedString == "adelante") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
    } else if (receivedString == "atras") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, velocidad)
    } else if (receivedString == "izquierda") {
        maqueen.motorStop(maqueen.Motors.M1)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velocidad)
    } else if (receivedString == "derecha") {
        maqueen.motorStop(maqueen.Motors.M2)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velocidad)
    } else if (receivedString == "para") {
        para()
    }
    basic.pause(200)
})
let luces: neopixel.Strip = null
let velocidad = 0
radio.setGroup(1)
basic.showNumber(1)
para()
