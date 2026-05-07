# CI/CD Pipeline Diagram

## Overview
This document outlines the Continuous Integration and Continuous Deployment (CI/CD) pipeline for **Flashcard Master**. The pipeline automates testing, building, and deploying the application to production while running a post-deployment smoke test to ensure system stability.

## Pipeline Flow
```mermaid
graph TD
    %% Triggers
    A([Push / PR to dev]) --> B
    C([Push / PR to main]) --> B
    
    %% Build & Test Job
    subgraph CI [Continuous Integration Job]
        B[Checkout Code] --> D[Setup Node.js 18.x]
        D --> E[Install Dependencies]
        E --> F[Run Linter]
        F --> G[Run Unit Tests]
        G --> H[Build React App]
    end
    
    %% Deploy Job (Only for Main)
    subgraph CD [Continuous Deployment Job]
        H -->|If branch == main| I[Download Build Artifact]
        I --> J[Inject Deployment Secrets]
        J --> K[Deploy to Production]
        K --> L{Smoke Test}
        L -->|HTTP 200| M([Deployment Successful])
        L -->|HTTP != 200| N([Deployment Failed])
    end

    %% Styles
    classDef trigger fill:#6366f1,stroke:#fff,stroke-width:2px,color:#fff;
    classDef success fill:#22c55e,stroke:#fff,stroke-width:2px,color:#fff;
    classDef fail fill:#ef4444,stroke:#fff,stroke-width:2px,color:#fff;
    
    class A,C trigger;
    class M success;
    class N fail;
```