---
layout: page
title: Projects
permalink: /projects/
---

## Selected Engineering Projects

These projects reflect my interest in hands-on engineering, rapid iteration, and building practical tools.  
Professional projects are described at a high level and avoid proprietary details.

---

### Hardware-Accelerated Cryptography Integration

**Problem:**  
Integrate and validate hardware cryptographic engines across multiple microcontroller families while maintaining a consistent API surface.

**What I Worked On:**
- Integrated AES (ECB, CTR, GCM, CCM, XTS), SHA, ECC, TRNG, and PKE hardware engines
- Designed wrapper layers to normalize behavior across different hardware implementations
- Debugged DMA interactions, interrupt behavior, and hardware state machines

**Key Takeaways:**
- Hardware acceleration introduces non-obvious timing and state constraints
- Clear abstraction boundaries are critical for long-term maintainability

---

### Host-Side Embedded Test Framework

**Problem:**  
Embedded cryptographic code is difficult to validate purely on-device.

**What I Built:**
- Host-side unit testing framework using CMake, Unity, and GCC
- Hardware abstraction mocks for crypto engines, DMA, and interrupts
- Automated regression testing and coverage reporting

**Why It Matters:**
- Enables fast iteration without flashing hardware
- Improves confidence in correctness and edge cases

---

## Personal & Side Projects

These projects reflect my interest in hands-on engineering, rapid iteration, and building practical tools.

---

### Mini Guitar Hero Controllers

<img src="/images/ghcontroller.jpg"
     alt="Mini Guitar Hero Controller"
     style="max-width:600px; width:100%; display:block; margin:1.5rem auto;" />

**Motivation:**  
Commercial Guitar Hero controllers have become surprisingly expensive, and I already owned a 3D printer along with many of the required electronic components.

Rather than purchasing new controllers, it was cheaper and more interesting to build my own.

**What I Built:**
- Compact custom Guitar Hero-style controllers
- Used an **ATmega32U4-based board (Arduino Micro form factor)** for native USB HID support
- Leveraged existing parts such as switches and wiring, minimizing new component costs
- Designed and 3D-printed the enclosure and mechanical components

**Why It Was Worth Doing:**
- Reduced cost compared to buying original controllers
- Full control over form factor and input layout
- Reinforced firmware, hardware, and mechanical integration skills

---

### Shared Household Calendar (Magic Mirror–Style Display)

<img src="/images/calendar.jpg"
     alt="Shared Household Calendar Display"
     style="max-width:600px; width:100%; display:block; margin:1.5rem auto;" />

**Motivation:**  
At one point, my girlfriend, her parents, and I were all living in the same house. Coordinating appointments, vacations, and medical visits across multiple people became difficult using individual calendars.

We needed a **single, always-visible source of truth**.

**What I Built:**
- A shared calendar display connected to multiple Google Calendar accounts
- Integrated each person’s calendar with **color coding** to clearly show:
  - Who has events
  - What day events occur
  - Overlapping schedules
- Designed the system to be readable at a glance from across the room

**Why It Was Worth Doing:**
- Reduced scheduling conflicts and missed appointments
- Improved visibility for shared plans and travel
- Demonstrated practical integration of software services into a physical display

---

### Shop Vac → Pet Vacuum Adapter

<div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; margin:1.5rem 0;">
  <img src="/images/petvacbrush.png"
       alt="Pet Vacuum Brush"
       style="max-width:300px; width:100%;" />
  <img src="/images/petvacadapter.jpg"
       alt="3D Printed Pet Vacuum Adapter"
       style="max-width:300px; width:100%;" />
</div>

**Motivation:**  
Pet grooming vacuum attachments are convenient but often limited by weak suction and small collection capacity. I already owned a shop vacuum with significantly stronger suction power and a much larger capacity.

The goal was to reduce grooming time and avoid frequent stops to empty the vacuum by leveraging equipment I already had.

**What I Built:**
- A custom-designed adapter to connect pet grooming vacuum brushes to a shop vac
- Iterated the adapter design using 3D printing to ensure proper fitment and airflow
- Designed the part to be durable enough for repeated use while maintaining a good seal

**Why It Was Worth Doing:**
- Stronger suction improved grooming effectiveness
- Larger capacity reduced interruptions during grooming sessions
- Less time wasted grooming
- Reinforced practical mechanical design and rapid iteration skills

---

### 3D Printing & Functional Parts

- Design and print small functional components, adapters, and fixtures
- Focus on tolerances, mechanical fit, and real-world usability
- Frequently used to support electronics, prototyping, and household projects
