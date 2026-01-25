---
layout: page
title: Resume
permalink: /resume/
---

# Errol Pascua
**Embedded Software Engineer — Cryptography & Security**

📍 Chandler, AZ  
📞 (480) 252-4571  
📧 errol.pascua99@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/errol-pascua)

📄 [Download PDF Resume](resume/Errol_Pascua_Updated.pdf)


---

## Objective
Embedded software engineer specializing in cryptography and security-focused development, with experience building, validating, and automating hardware-accelerated crypto systems for production microcontrollers. Seeking to contribute to secure, high-reliability embedded platforms.

---

## Professional Experience

### **Microchip Technology Inc.** — Chandler, AZ  
**Embedded Software Engineer — Cryptography & Security**  
*January 2022 – Present*

#### Cryptographic Hardware & Firmware Development
- Ported and integrated cryptographic hardware drivers across multiple Microchip device families (MCU32, dsPIC, HSM, HSM-Lite).
- Implemented support for **AES (ECB, CTR, GCM, CCM, XTS)**, **SHA-1/SHA-2**, **CMAC**, **ECDH**, **ECDSA**, **TRNG**, and **PKE**.
- Designed wrapper layers aligning device-specific drivers with **Microchip Common Crypto API v4**, enabling consistent behavior across heterogeneous hardware.
- Mapped hardware registers, implemented ISR helpers, validated DMA interactions, and debugged crypto state machines.
- Authored benchmark, demo, and validation applications for performance and correctness analysis.
- Strengthened secure boot and key provisioning flows using **HSM**, **TCG DICE**, and hardware-rooted trust architectures.

#### Unit Testing, Verification, & ASPICE SWE1–SWE3
- Designed an end-to-end **host-side unit testing framework** using **Unity**, **CMake**, **MinGW/GCC**, and **Python**.
- Built extensive unit test suites for AES, SHA, ECC, TRNG, PKE, DMA, and ISR paths using hardware mocks.
- Implemented **GCOV-based code coverage** with HTML reports (line & branch) to support **ASPICE** and **ISO-21434** compliance.
- Authored full **ASPICE SWE.1, SWE.2, and SWE.3** work products including requirements, architecture, design, test specifications, and verification matrices.
- Ensured **MISRA-C** compliance via automated static analysis and structured design reviews.

#### Build Systems, Tooling, & Automation
- Created Python-based build infrastructure automating:
  - Device configuration
  - Template generation (FMPP)
  - Static library builds
  - Host-side test builds
- Developed and maintained **device-aware CMake toolchains**, including special compiler modes (e.g., `no-short-double`).
- Built a Python GUI integrating **Cppcheck Premium** and **MPLAB X MISRA-C CLI** to streamline static-analysis workflows.
- Implemented automated regression testing systems to reduce manual testing and improve reliability.

#### Security & Platform Engineering
- Updated secure key provisioning flows ensuring correct migration of keys from RAM to ROM.
- Developed the **Firmware Metadata Tool (FWMDT)** used by external customers for HSM provisioning and firmware signing.

---

### **Southwest Engineering Concepts** — Chandler, AZ  
**Engineering Intern**  
*September 2021 – January 2022*

- Developed a wireless pop-time measurement device using accelerometer and gyroscope data.
- Designed vinyl film monitoring systems and inductive rifle chronographs.
- Modified PCB layouts and schematics to integrate additional hardware capabilities.
- Created documentation, schematics, and embedded firmware for **STM32** and **Microchip** MCUs.
- Gained hands-on experience in **through-hole and SMD soldering** and electronics prototyping.

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
