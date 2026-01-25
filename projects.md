---
layout: page
title: Projects
permalink: /projects/
---

## Selected Engineering Projects

These projects reflect the types of systems I work on professionally, focusing on embedded security, correctness, and tooling. Descriptions are intentionally high-level.

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

### Secure Key Provisioning & Trust Flows

**Problem:**  
Ensure cryptographic keys transition safely from development to production environments.

**What I Worked On:**
- Secure key provisioning workflows backed by hardware-rooted trust
- Firmware metadata handling for provisioning and signing workflows
- Validation of key migration paths from volatile to non-volatile storage

---

## Personal & Side Projects

These projects reflect my interest in hands-on engineering, rapid iteration, and building practical tools.

---

### Mini Guitar Hero Controllers

- Designed and built compact custom controllers
- Focused on input handling, latency, and reliability
- Combined embedded firmware with mechanical design considerations

---

### Magic Mirror

- Built a smart mirror displaying dynamic information
- Integrated software, hardware, and enclosure design
- Focused on usability and clean presentation

---

### Shop Vac → Pet Vacuum Adapter

- Designed a custom adapter to use pet grooming vacuum brushes with a higher-power shop vac
- Modeled and iterated parts using 3D printing
- Balanced airflow, fitment, and durability

---

### 3D Printing & Functional Parts

- Design and print small functional components, adapters, and fixtures
- Emphasis on iteration, tolerances, and real-world usability
- Often used to support other electronics and household projects
