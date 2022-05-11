function arranca () {
    velocidad = 80
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    luces.showColor(neopixel.colors(NeoPixelColors.Red))
    music.playMelody("A B A G A B A G ", 444)
    personalizar()
    arrancado = true
}
function para () {
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    luces.showColor(neopixel.colors(NeoPixelColors.Black))
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
        	
        }
    } else if (receivedString == "arranca") {
        if (!(penalizado)) {
            arranca()
        }
    }
    compruebaBorde()
    basic.pause(100)
})
function personalizar () {
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
        for (let index = 0; index < 6; index++) {
            basic.clearScreen()
            music.setVolume(127)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            music.playTone(392, music.beat(BeatFraction.Whole))
            basic.pause(150)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            basic.showNumber(dorsal)
            basic.pause(150)
        }
        penalizado = false
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, velocidad)
        basic.pause(2000)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        basic.pause(1200)
        para()
    }
}
function usaTurbo () {
    if (turbos > 0) {
        music.playTone(523, music.beat(BeatFraction.Double))
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad * 4)
        basic.pause(2000)
        music.playTone(175, music.beat(BeatFraction.Double))
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
        turbos += -1
    }
}
let dorsal = 0
let penalizado = false
let arrancado = false
let velocidad = 0
let turbos = 0
let luces: neopixel.Strip = null
basic.clearScreen()
music.stopAllSounds()
radio.setGroup(80)
luces = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
para()
personalizar()
turbos = 10
