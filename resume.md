---
layout: page
title: Resume
permalink: /resume/
---

# Errol Pascua
**Embedded Software Engineer -- Cryptography & Security**

Chandler, AZ  
errol.pascua99@gmail.com  

[LinkedIn](https://www.linkedin.com/in/errol-pascua)  
[Download PDF Resume](resume/Errol_Pascua.pdf)

---

## Summary
Embedded firmware engineer with 4+ years supporting cryptographic subsystems on 32-bit ARM microcontrollers across multiple PIC32 families. Experienced porting driver code across shared-IP silicon targets, building and maintaining demo and reference applications, validating crypto API functionality through automated test vector suites, and enforcing MISRA-C compliance through static analysis. Currently independently implementing a TCG DICE attestation subsystem with full ASPICE work product ownership. U.S. Citizen.

---

## Professional Experience

### **Microchip Technology Inc.** -- Chandler, AZ
**Software Engineer -- Cryptography & Security**
*January 2022 -- Present*

#### Firmware Porting & Application Development
- Ported existing cryptographic driver code from a shared-IP device to PIC32CM SG by creating xc32/CMake build scripts, mapping hardware registers to the target silicon, and validating correct operation through demo applications and test vector suites.
- Built and maintained demo and reference applications demonstrating common crypto API usage (**AES**, **SHA**, **ECDH**, **ECDSA**, **TRNG**) across multiple PIC32 families (PIC32CM SG, PIC32CK SG01, PIC32CX MTG, PIC32CZ CA90), serving as proof-of-concept examples and customer-facing documentation.
- Developed a secure messaging demo application using existing common crypto APIs -- implementing ECDH key exchange, AES-256-GCM encryption, SHA-384 hashing, and ECDSA signing across TrustZone secure/non-secure boundaries on PIC32CM SG.
- Modified existing secure boot use case (Python and C) to change cryptographic key storage from ROM-backed to RAM-based approach for provisioning flexibility.
- Updated existing demo applications to work with latest compiled static library releases (`.a` files), maintaining header compatibility and verifying functionality across library version changes.
- Independently implementing TCG DICE attestation subsystem for PIC32CM SG *(in progress)* -- scoping all ASPICE work products (requirements, design documents, test plans) and adapting an existing DICE framework originally developed for a different target.

#### Validation, Debugging & Code Quality
- Validated cryptographic API functionality using **ACVP** test vector suites run through automated tooling, comparing expected outputs against NIST-standard reference values across multiple crypto algorithms.
- Expanded an existing command-line unit test framework (**Unity**, **CTest**) to generate HTML coverage reports with color-coded line, call, and branch coverage using **GCOV**, improving visibility into untested code paths.
- Wrote comprehensive unit test suites covering the entire HSM-Lite cryptographic driver (AES, SHA, ECC, TRNG, DMA, ISR paths) using **Unity/CMock** with hardware mocks.
- Debugged an NVIC interrupt collision where shared interrupt handlers caused incorrect ISR routing -- identified the issue using a Saleae logic analyzer with GPIO pin toggling to observe the stuck interrupt, then resolved it by separating the handler registrations.
- Enforced **MISRA-C** compliance across embedded codebases using **Cppcheck Premium** and **Coverity**, triaging 100--300+ findings per analysis run, resolving violations, and documenting justified deviations.
- Ported the **ARTEMIS** automated regression test framework to four target devices (PIC32CM SG, PIC32CK SG01, PIC32CX MTG, PIC32CZ CA90), configuring power-cycle sequencing, IPE programming, and serial output parsing for pass/fail reporting.

#### Tooling, Documentation & Process
- Built Python GUI wrapper tools for **Cppcheck Premium** and **Coverity** static analysis workflows, adding configuration persistence, dark-themed UIs, and one-click report generation to streamline local MISRA scanning.
- Created a Python GUI wrapper for an existing internal firmware metadata tool (FWMDT), simplifying the interface for HSM provisioning address configuration.
- Built Python CLI tooling for static analysis pipelines, including configuration management (YAML/JSON parsing), XML report processing, and wrapper scripts for tool execution.
- Created API reference documentation and user guides for common crypto APIs used by internal teams and customers.
- Backfilled **ASPICE** SWE1--SWE3 work products (requirements specifications, architecture documents, detailed designs, test plans) for existing work streams that lacked formal documentation.
- Supported driver release processes including bug tracking, validation review, release preparation, and ticket management across shared repositories.
- Participated in PR-based code review workflows on Bitbucket, Agile standups, and sprint ceremonies; coordinated cross-team dependencies with the DS PICs team on shared-IP driver integration.

---

### **Southwest Engineering Concepts** -- Chandler, AZ
**Engineering Intern**
*September 2021 -- January 2022*

- Assisted in developing embedded products from requirements through prototyping, including a vinyl film monitoring system, an inductive rifle chronograph, and a wireless pop-timer redesign.
- Designed schematics and PCB layouts under guidance of a principal engineer; sourced components from Digikey/Mouser, assembled prototypes, and performed board bring-up.
- Implemented firmware in C for **dsPIC** and **STM32** microcontrollers, translating datasheets and hardware specifications into working application software.
- Gained hands-on experience with through-hole and SMD soldering, electronics prototyping, and hardware debugging.

---

## Education

**Arizona State University** -- Tempe, AZ
**B.S.E. Computer Systems Engineering (Cybersecurity Concentration)**
*May 2021*

---

## Technical Skills

### Languages
C, C++, Python, Bash/Shell scripting

### Platforms
32-bit ARM Cortex-M (PIC32CM SG, PIC32CK SG01, PIC32CX MTG, PIC32CZ CA90, SAM), STM32, Bare-Metal Firmware, TrustZone Secure/Non-Secure Environments, HSM-Lite Hardware Accelerators

### Build & Tooling
xc32, GCC, CMake, MPLAB X IDE, Segger Embedded Studio, STM32CubeIDE, Git, Bitbucket, Jira, Confluence, Polarion, Tridion Docs

### Testing & Quality
ACVP Test Vector Validation, MISRA-C Compliance (Cppcheck Premium, Coverity), Unity/CMock, GCOV Coverage Reporting, ASPICE-Aligned Processes

### Debug & Instrumentation
Saleae Logic Analyzer, MPLAB PKOB On-Board Debugger, Segger J-Link, Oscilloscope, GPIO-Based Signal Tracing, Soldering (TH & SMD)

---

## Focus Areas
- Cryptographic Firmware (AES, SHA, ECDH, ECDSA, TRNG)
- Secure Architectures (TrustZone, HSM)
- Secure Boot & Key Provisioning
- TCG DICE Attestation
- ACVP & Cryptographic Validation
- MISRA-C & ASPICE Compliance
- Test Automation for Embedded Systems
