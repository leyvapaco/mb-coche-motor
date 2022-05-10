function arranca () {
    velocidad = 35
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    music.playMelody("A B A G A B A G ", 444)
    arrancado = true
}
function para () {
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    arrancado = false
}
radio.onReceivedString(function (receivedString) {
    if (arrancado == true) {
        if (receivedString == "adelante") {
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
        } else if (receivedString == "turbo") {
            usaTurbo()
        }
    } else if (receivedString == "arranca") {
        if (!(penalizado)) {
            arranca()
        }
    }
    compruebaBorde()
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
        penalizado = true
        for (let index = 0; index < 8; index++) {
            luces.showColor(neopixel.colors(NeoPixelColors.Red))
            music.setVolume(127)
            music.playTone(330, music.beat(BeatFraction.Whole))
            basic.pause(500)
            luces.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause(500)
        }
        penalizado = false
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 25)
        basic.pause(1000)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 25)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 25)
        basic.pause(1000)
        para()
    }
}
function usaTurbo () {
    if (turbos > 0) {
        radio.sendNumber(turbos - 1)
        basic.pause(100)
        music.playTone(523, music.beat(BeatFraction.Double))
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad * 3)
        basic.pause(3000)
        music.playTone(175, music.beat(BeatFraction.Double))
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
        turbos += -1
    }
}
let dorsal = 0
let luces: neopixel.Strip = null
let penalizado = false
let arrancado = false
let velocidad = 0
let turbos = 0
radio.setGroup(80)
music.stopAllSounds()
basic.clearScreen()
para()
personalizar()
turbos = 6
