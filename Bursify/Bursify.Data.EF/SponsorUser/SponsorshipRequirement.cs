﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bursify.Data.User;

namespace Bursify.Data.EF.SponsorUser
{
    public class SponsorshipRequirement : IBridgeEntity
    {
        public int SponsorshipId { get; set; }
        public int SubjectId { get; set; }
        public int RequiredMark { get; set; }

        public virtual Sponsorship Sponsorship { get; set; }
        public virtual Subject Subject { get; set; }

        public int leftId
        {
            get { return SponsorshipId; }
        }

        public int rightId
        {
            get { return SubjectId; }
        }
    }
}
