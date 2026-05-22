#include <Servo.h>
#include <NewPing.h>

#define SERVO_PIN 9
#define LED       13
#define TRIG      6
#define ECHO      7

NewPing sonar(TRIG, ECHO, 400);

Servo gate;
bool gateOpen = false;
unsigned long openedAt = 0;
const unsigned long HOLD_MS = 5000;
const float THRESHOLD = 200.0;
//193 - for opening
//194 - for closing
float getDistance() {
  delay(50);
  float d = sonar.ping_cm();
  if (d == 0) return 999;
  return d;
}

// LED blinks WHILE gate moves
void moveGate(int from, int to) {
  int step = (to > from) ? 1 : -1;
  for (int i = from; i != to + step; i += step) {
    gate.write(i);
    digitalWrite(LED, (millis() / 100) % 2);
    delay(11); // 90 steps × 11ms = ~1 second
  }
  digitalWrite(LED, LOW);
}

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
  gate.attach(SERVO_PIN);
  gate.write(0);
  Serial.println("READY - Waiting for vehicle...");
}

void loop() {
  float d = getDistance();
  bool vehiclePresent = d < THRESHOLD;

  Serial.print("Dist: ");
  Serial.print(d);
  Serial.print(" cm | Gate: ");
  Serial.println(gateOpen ? "OPEN" : "CLOSED");

  // Vehicle detected → open gate
  if (!gateOpen && vehiclePresent) {
    Serial.println("Vehicle detected! Opening gate...");
    moveGate(0, 90);     // LED blinks during opening
    gateOpen = true;
    openedAt = millis();
    Serial.println("Gate open. Holding for 5 seconds...");
  }

  // 5 seconds passed → check if path is clear
  if (gateOpen && millis() - openedAt >= HOLD_MS) {
    if (!vehiclePresent) {
      Serial.println("Path clear! Closing gate...");
      moveGate(90, 0);   // LED blinks during closing
      gateOpen = false;
      Serial.println("Gate closed. Ready.\n");
    } else {
      Serial.println("Path blocked! Holding open...");
      openedAt = millis(); // reset 5 second timer
    }
  }

  delay(200);
}