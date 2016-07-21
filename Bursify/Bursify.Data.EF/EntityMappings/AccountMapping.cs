﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Bursify.Data.EF.CampaignUser;

namespace Bursify.Data.EF.EntityMappings
{
    public class AccountMapping : EntityTypeConfiguration<Account>
    {
        public AccountMapping()
        {
            this.ToTable("Account", "dbo");

            this.HasKey(x => x.CampaignId);
            
            this.Property(x => x.AccountName)
                .HasMaxLength(200)
                .IsRequired();

            this.Property(x => x.AccountNumber)
                .HasMaxLength(50)
                .IsRequired();

            this.Property(x => x.BankName)
                .HasMaxLength(50)
                .IsRequired();

            this.Property(x => x.BranchName)
                .HasMaxLength(50)
                .IsOptional();

            this.Property(x => x.BranchCode)
                .HasMaxLength(50)
                .IsOptional();

            this.HasRequired(x => x.Campaign)
                .WithRequiredDependent(a => a.Account);

        }
    }
}