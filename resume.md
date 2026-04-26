---
layout: page
title: Resume
permalink: /resume/
---

# Errol Pascua
**Embedded Software Engineer -- Cryptography & Security**

Chandler, AZ | errol.pascua99@gmail.com

[LinkedIn](https://www.linkedin.com/in/errol-pascua) &nbsp;|&nbsp; [Download PDF Resume](resume/Errol_Pascua.pdf)

---

## Summary

Embedded firmware engineer with 4+ years developing bare-metal software on ARM Cortex-M microcontrollers. Core strength in low-level C, hardware-accelerated cryptographic driver development, and compliance-driven development (MISRA-C, ASPICE). Experienced building internal test frameworks, build infrastructure, and developer tooling in Python and C.

---

## Professional Experience

### **Microchip Technology Inc.** -- Chandler, AZ
**Software Engineer -- Cryptography & Security**
*January 2022 -- Present*

#### DICE Attestation (TCG) *(in progress)*
- Validated the platform's boot ROM DICE implementation (Layer 0) through hands-on testing: CDI generation, secure memory access, and characterizing what the hardware provides
- Drafting Layer 1 architecture and requirements for a general market solution, drawing on an existing internal DICE reference implementation on a related PIC32 device family
- Authoring ASPICE SWE.1--SWE.4 work products in parallel with the design

#### Hardware Cryptographic Driver Port -- PIC32CM SG
- Ported hardware cryptographic drivers from 16-bit dsPIC to 32-bit ARM Cortex-M (PIC32CM SG) -- same underlying IP, but required remapping hardware registers, migrating the build from XC-DSC to xc32, and resolving 32-bit architecture differences
- Drivers covered AES (ECB, CTR, GCM, CCM, XTS), SHA-1/SHA-2, CMAC, HMAC, GMAC, ECDH, ECDSA, RSA, ChaCha20, TRNG, and PKE; PKE required adapting to device-stored microcode rather than the source-embedded approach used on the 16-bit target
- Backfilled ASPICE SWE.1--SWE.3 and API reference documentation in parallel with driver work

#### Unit Testing & Verification
- Built Python-based build infrastructure to compile and run the existing Unity/CMock/CTest framework against the new device target
- Wrote all unit test suites for crypto engine, DMA, and ISR paths using hardware mocks
- Extended existing GCOV tooling with a visual HTML coverage report highlighting missing line, branch, and call coverage
- Authored ASPICE SWE.4 (unit test specifications and verification matrix)

#### TrustZone Secure Messaging Demo
- Developed cross-TrustZone crypto pipeline on PIC32CM SG: ECDH key agreement, TRNG IV generation, AES-256-GCM authenticated encryption, SHA-384 hashing, and ECDSA sign/verify
- Implemented NSC veneer functions and struct interfaces for secure/non-secure boundary crossing

#### Crypto v4 Documentation, Testing & Applications
- Authored Crypto v4 API reference documentation published to Microchip's online developer documentation
- Ported ARTEMIS regression test framework to PIC32CX MTG, PIC32CZ CA91, PIC32CK SG, and PIC32CM SG
- Built and maintained Crypto v4 demo applications for PIC32CM SG, PIC32CX MTG, PIC32CZ CA9x, and PIC32CK SG demonstrating hardware-accelerated and software-backed cryptographic operations

#### Build Systems & Tooling
- Built Python/Tkinter GUI tools for MISRA-C static analysis workflows (Cppcheck Premium, Coverity) and firmware provisioning tooling

#### Static Analysis & MISRA-C Compliance
- Progressed team toolchain from MISRA-C:2012 through MISRA-C:2023 to MISRA-C:2025
- Actively resolving 100--300+ findings per analysis cycle using Cppcheck Premium and Coverity

---

### **Southwest Engineering Concepts** -- Chandler, AZ
**Engineering Intern**
*September 2021 -- January 2022*

- Developed embedded products from requirements through prototyping: wireless pop-time measuring instrument, vinyl film monitoring system, inductive chronograph
- Designed schematics and PCB layouts; sourced components; assembled and validated prototypes
- Programmed embedded systems in C for STM32 and Microchip microcontrollers

---

## Education

**Arizona State University** -- Tempe, AZ
**B.S.E. Computer Systems Engineering (Cybersecurity Concentration)**
*May 2021*

---

## Technical Skills

| Category | Details |
|---|---|
| **Languages** | C (primary), Python (scripting/tooling), C++ (working knowledge), Bash/Shell |
| **Cryptography** | AES (ECB/CTR/GCM/CCM/XTS), SHA-1/SHA-2, CMAC, HMAC, ECDH, ECDSA, RSA, ChaCha20, TRNG, PKE, X.509, DICE/TCG attestation |
| **Security** | TrustZone (ARMv8-M), wolfCrypt, Microchip Crypto v4, hardware-rooted trust, secure boot |
| **Hardware** | ARM Cortex-M (PIC32CM, PIC32CK, PIC32CX, PIC32CZ, SAM), dsPIC, STM32; register-level programming, ISR/DMA handling |
| **Debug/Tools** | Segger J-Link, logic analyzers, oscilloscopes, GPIO tracing, MPLAB X IDE, Segger Embedded Studio |
| **Build Systems** | CMake, xc32, GCC/MinGW, Python build automation |
| **Static Analysis** | MISRA-C:2012/2023/2025, Cppcheck Premium, Coverity |
| **Testing** | NIST ACVP, Unity, CMock, CTest, GCOV, ARTEMIS regression framework |
| **DevOps/Collab** | Git, Bitbucket, Jira, Confluence, Polarion, Tridion Docs |
| **Process** | ASPICE (SWE.1--SWE.4), Agile/Scrum |
