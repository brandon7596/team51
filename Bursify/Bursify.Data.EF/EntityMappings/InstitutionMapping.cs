﻿using Bursify.Data.EF.User;
using System.Data.Entity.ModelConfiguration;

namespace Bursify.Data.EF.EntityMappings
{
    public class InstitutionMapping : EntityTypeConfiguration<Institution>
    {
        public InstitutionMapping()
        {
            this.ToTable("Institution", "dbo");

            this.HasKey(x => x.ID);

            this.Property(x => x.ID)
                .IsRequired();
           
            this.Property(x => x.Name)
                .HasMaxLength(500)
                .IsRequired();

            this.Property(x => x.Type)
                .HasMaxLength(50)
                .IsRequired();

            this.Property(x => x.Website)
                .HasMaxLength(500)
                .IsOptional();

            this.HasRequired(x => x.Student);
        }
    }
}
