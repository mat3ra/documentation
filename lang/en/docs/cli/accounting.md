# Accounting

As explained in detail in the corresponding [part of the documentation]({{ reference_url }}/accounts/overview/), we implement as system of **Accounts** for managing the user consumption of our computational resources. 

These accounts each have a [storage quota]({{ reference_url }}/accounts/quota/) and a [balance]({{ reference_url }}/accounts/balance/) for making the necessary [payments]({{ reference_url }}/accounts/payments-charges/) to our system. These account-related features depend on the choice of the [Service Level]({{ guide_url }}/pricing/service-levels/).

Information pertaining to accounts can also be retrieved under the [Command Line Interface](overview.md) (CLI) of our platform, as introduced in what follows.

## Accounting CLI Actions

We introduce the relevant actions and commands for inspecting the account balance and quota via CLI [in this dedicated page](actions/balance-quota.md).

## Implementation

The full documentation manual for the software used to implement the allocation manager under the CLI can be found under Ref. [^1] below. 

### Command-line parameters

The account manager system is comprehensive and accepts multiple parameters. The full list of flags for each of the commands can be obtained by passing `--help` and is reproduced below for reference purposes using `statement`.

```bash
# > statement --help

Usage:
    gstatement [[-a] *account_id*] [-p *project_name*] [-u *user_name*] [-m
    *machine_name*] [-s *start_time*] [-e *end_time*] [--summarize] [-h,
    --hours] [--debug] [-?, --help] [--man] [-V, --version]
```

## Links

[^1]: [Gold Allocation Manager User’s Guide, Document](http://docs.adaptivecomputing.com/gold/pdf/GoldUserGuide.pdf)
