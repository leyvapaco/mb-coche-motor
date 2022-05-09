function arranca () {
    velocidad = 35
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    music.playMelody("A B A G A B A G ", 426)
}
function para () {
    maqueen.motorStop(maqueen.Motors.All)
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
function personalizar () {
    luces = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    luces.showColor(neopixel.colors(NeoPixelColors.Purple))
    dorsal = 1
    basic.showNumber(dorsal)
    radio.sendNumber(dorsal)
    music.setVolume(220)
    basic.pause(100)
}
function compruebaBorde () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        para()
        for (let index = 0; index < 10; index++) {
            luces.showColor(neopixel.colors(NeoPixelColors.Red))
            music.setVolume(127)
            music.playTone(330, music.beat(BeatFraction.Whole))
            basic.pause(500)
            luces.showColor(neopixel.colors(NeoPixelColors.White))
            basic.pause(500)
        }
    }
}
let dorsal = 0
let luces: neopixel.Strip = null
let velocidad = 0
radio.setGroup(80)
basic.clearScreen()
para()
personalizar()
