---
layout: page
title: Resume
permalink: /resume/
---

# Errol Pascua
**Embedded Software Engineer — Cryptography & Security**

📍 Chandler, AZ  
📧 errol.pascua99@gmail.com  

🔗 [LinkedIn](https://www.linkedin.com/in/errol-pascua)  
📄 [Download PDF Resume](resume/Errol_Pascua.pdf)

---

## Objective
Embedded software engineer specializing in cryptography and security-focused development, with experience building, validating, and automating hardware-accelerated crypto systems for production microcontrollers. Seeking to contribute to secure, high-reliability embedded platforms.

---

## Professional Experience

### **Microchip Technology Inc.** — Chandler, AZ  
**Embedded Software Engineer — Cryptography & Security**  
*January 2022 – Present*

#### Cryptographic Hardware & Firmware Development
- Ported and integrated cryptographic hardware drivers across multiple Microchip device families (MCU32, dsPIC).
- Implemented and validated support for **AES (ECB, CTR, GCM, CCM, XTS)**, **SHA-1 / SHA-2**, **CMAC**, **HMAC**, **GMAC**, **ECDH**, **ECDSA**, **RSA**, **ChaCha20**, **TRNG**, and **PKE** primitives.
- Designed wrapper layers aligning device-specific drivers with **Microchip Crypto v4**, supporting both **hardware accelerators and WolfSSL software backends**.
- Mapped hardware registers, implemented ISR helpers, validated DMA interactions, and debugged cryptographic state machines.
- Authored benchmark, demo, and validation applications to verify cryptographic performance, correctness, and reliability.
- Strengthened secure boot robustness by migrating cryptographic key storage from volatile RAM to non-volatile, ROM-backed storage.
- Created and maintained **Crypto v4 API documentation**, detailing cryptographic flows, backend selection (HSM vs software), and integration guidance for customer applications.
- Integrated and supported **ARTEMIS automated testing infrastructure** to execute regression and validation testing across cryptographic drivers and applications.




#### Unit Testing, Verification, & ASPICE SWE1–SWE3
- Designed an end-to-end **host-executed, hardware-mocked unit testing framework** using **Unity**, **CMake**, **GCC/MinGW**, and **Python**.
- Built extensive unit test suites for AES, SHA, ECC, TRNG, PKE, DMA, and ISR paths using hardware mocks.
- Implemented **GCOV-based code coverage** with HTML reports to support **ASPICE** and **ISO-21434** compliance.
- Authored full **ASPICE** work products including requirements, architecture, detailed design, test specifications, and verification matrices.
- Ensured **MISRA-C** compliance through automated static analysis and structured design reviews.

#### Build Systems, Tooling, & Automation
- Created Python-based build infrastructure automating:
  - Device configuration
  - Template generation (FMPP)
  - Static library builds
  - Host-executed unit test builds
- Developed and maintained **device-aware CMake toolchains**, including special compiler modes (e.g., `no-short-double`).
- Built a Python GUI integrating **Cppcheck Premium** and **MPLAB X MISRA-C CLI** to streamline static-analysis workflows.
- Implemented automated regression testing systems to reduce manual testing effort and improve reliability.
- Developed the **Firmware Metadata Tool (FWMDT)** used by external customers for HSM provisioning and firmware signing.

---

### **Southwest Engineering Concepts** — Chandler, AZ  
**Engineering Intern**  
*September 2021 – January 2022*

- Developed a **wireless pop-time measurement system** using accelerometer and gyroscope data to detect pitch release timing.
- Engineered **vinyl film monitoring systems** with sensor-based low-level and empty detection to prevent production downtime.
- Designed and prototyped an **inductive rifle chronograph** capable of accurately measuring muzzle velocity.
- Modified **schematics and PCB layouts** to integrate additional hardware features and improve existing designs.
- Implemented embedded firmware in **C** for **STM32** and **Microchip** microcontrollers, working directly from datasheets and reference manuals.
- Sourced components from **Digikey** and **Mouser**, assembled prototypes, and performed board bring-up and validation.
- Created customer-facing documentation, schematics, and test notes to support deployment and handoff.
- Gained hands-on experience with **through-hole and SMD soldering**, electronics prototyping, and hardware debugging.

---

## Education

**Arizona State University** — Tempe, AZ  
**B.S.E. Computer Systems Engineering (Cybersecurity)**  
*May 2021*

---

## Technical Skills

### Programming Languages
- C, C++, Python, Java, Assembly

### Software & Hardware Tools
- Git, Jenkins, Atlassian Suite (Jira, Confluence, Bitbucket)
- Polarion, Tridion Docs Publication Manager
- MPLAB X IDE, Segger Embedded Studio, STM32CubeIDE
- Logic analyzers, oscilloscopes, Segger J-Link
- Hardware bring-up, debugging, and soldering (TH & SMD)

---

## Focus Areas
- Embedded Cryptography
- Hardware Security Modules (HSM / HSM-Lite)
- Secure Boot & Key Provisioning
- ACVP & Cryptographic Validation
- MISRA-C, ASPICE, ISO-21434
- Test Automation & CI for Embedded Systems
