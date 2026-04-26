---
layout: page
title: Projects
permalink: /projects/
---

## Professional Projects

These are described at a high level and avoid proprietary details.

---

### DICE Attestation Subsystem (TCG) *(in progress)*

**Problem:**  
Bring TCG DICE attestation to a PIC32 ARM Cortex-M device family, working within the constraints of that platform's hardware security capabilities and boot architecture.

**What I'm Doing:**
- Validated the platform's boot ROM DICE implementation (Layer 0) through hands-on testing: CDI generation, secure memory access, and characterizing what the hardware provides
- Drafting Layer 1 architecture and requirements for a general market solution, drawing on an existing internal DICE reference implementation on a related PIC32 device family
- Authoring ASPICE SWE.1--SWE.4 work products in parallel with the design


---

### Hardware-Accelerated Cryptography Driver Integration

**Problem:**  
Integrate and validate hardware cryptographic engines across multiple PIC32 ARM Cortex-M microcontroller families (PIC32CM, PIC32CK, PIC32CX, PIC32CZ) against a common API surface.

**What I Worked On:**
- Ported and validated AES (ECB, CTR, GCM, CCM, XTS), SHA-1/SHA-2, ECDH, ECDSA, TRNG, CMAC, HMAC, and PKE hardware engines across device families
- Designed wrapper layers aligning device-specific hardware drivers with Microchip's Crypto v4 API, supporting both hardware accelerators and WolfSSL software backends
- Mapped hardware registers, implemented ISR helpers, debugged DMA interactions, and validated cryptographic hardware state machines
- Validated all implementations against NIST ACVP test vectors

**Key Constraints:**
- Different silicon targets share IP but diverge at the register and DMA level -- wrapper design had to be robust enough to handle both without leaking hardware details upward
- DMA and interrupt interactions introduced race conditions that only appeared under specific load conditions; isolated with a logic analyzer and GPIO tracing

---

### Host-Side Embedded Test Framework

**Problem:**  
Cryptographic driver code running on ARM Cortex-M hardware is slow to iterate on -- each test cycle requires a build, flash, and serial read. Hardware is not always available.

**What I Built:**
- Host-side unit testing framework using CMake, Unity, CMock, and GCC/MinGW -- runs on a development machine with hardware mocked out
- Full hardware abstraction layer mocking crypto engines, DMA controllers, and interrupt paths
- GCOV-based line, call, and branch coverage with HTML reports to support ASPICE compliance verification
- Ported the ARTEMIS regression framework to four target device families for on-device regression runs

**Why It Matters:**
- Eliminates the flash-and-test cycle for the majority of correctness work
- Makes it practical to hit coverage targets required for ASPICE compliance without constant hardware access

---

## Personal Projects

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
