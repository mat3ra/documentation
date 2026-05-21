# Migrating to The New Platform (Q4 2025)

> Last updated Oct 7, 2025.

We are excited to announce the immediate availability of the new iteration of the Mat3ra platform. This is a significant
upgrade over previous monthly releases and introduces new infrastructure, compute options, and improvements to the
overall user experience.

!!!note "Important": For a smooth transition, both the old and the new platform versions will remain operational
through the end of 2025. See the timeline below.

---

## What’s New

### Free compute tier (cluster-101)

A new always-available free tier via `cluster-101`. Read
more: [Free Tier and Community Access](other/community-programs.md)
and [Cluster-101](infrastructure/clusters/cluster-101.md).

### New cloud infrastructure setup

As below:

- Google Cloud Platform via `cluster-001` — see [GCP clusters]({{ dev_url }}/infrastructure/clusters/google/)
- Amazon Web Services via `cluster-002` — see [AWS clusters]({{ dev_url }}/infrastructure/clusters/aws/)
- Microsoft Azure via `cluster-003` — see [Azure clusters]({{ dev_url }}/infrastructure/clusters/azure/)
- Updated set of instance types across providers, including larger CPU and GPU options

### Operating system upgrade

Base OS updated to RHEL 9 across the new platform infrastructure

### Apptainer-based application deployment

As below:

- Modernized packaging and runtime isolation for scientific applications
- See: [Jobs via Command Line](jobs-cli/batch-scripts/apptainer.md) for updated CLI usage and examples
- We welcome contributions for additional applications your workflows require

---

## Where to Access

- New platform (now available): `https://platform-new.mat3ra.com`
- Current/old platform: `https://platform.mat3ra.com`
- New documentation: `https://docs-new.mat3ra.com`
- New login node: `https://login-new.mat3ra.com`

You can sign in to the new platform with the same credentials you use for the current platform.

---

## Migration Timeline

- **Now → Oct 31, 2025**:
    - Both old and new platforms are live. You can explore and begin migrating at your convenience.

- **On/after Nov 1, 2025**
    - `https://platform.mat3ra.com` will route to the new platform
    - The old platform will remain accessible at `https://platform-old.mat3ra.com`
    - Equivalent routing changes will apply to related URLs (docs, login)

- **On/after Jan 1, 2026**
    - Only the new platform will remain available

---

## What Gets Migrated Automatically

Application data stored in the platform database (entities, metadata, workflows, settings) is migrated automatically.

## What Does NOT Migrate Automatically

Runtime files and bulk data stored on disk do not migrate automatically. Due to updated infrastructure libraries and
layout in the new environment, data migration from legacy cluster homes and shares is handled on a case-by-case basis.

> Tip: Review data locations under [Data on Disk > Directory Structure]({{ dev_url }}/data-on-disk/directories/)
> and [Infrastructure > Login Node Directories]({{ dev_url }}/infrastructure/login/directories/) to plan your migration.

---

## Recommended Migration Steps

1. Sign in to the new platform at `https://platform-new.mat3ra.com` and verify access
2. Review your workflows for compatibility; see updated examples under [Jobs via Command Line](jobs-cli/overview.md)
3. Identify runtime data to transfer (e.g., project files, job outputs) from legacy cluster homes
4. Contact us for assistance with bulk data migration and best practices
5. Validate your workflows on the new clusters (e.g., `cluster-001`, `cluster-002`, `cluster-003`, `cluster-101`)

## CLI and Environment Modules with Apptainer

See examples of module loading, `$EXEC_CMD`, and containerized execution
in: [Apptainer and Environment Modules](jobs-cli/batch-scripts/apptainer.md)

## Contact Support

- For migration help (data movement, cluster selection, workflow updates), contact your Mat3ra representative or reach
  us via Support Widget in the platform header or `support@mat3ra.com`.
- If you require a specific application or environment, please let us know — we welcome contributions and requests to
  expand supported software.
