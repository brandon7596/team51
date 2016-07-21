﻿using System.Collections.Generic;
using Bursify.Data.EF.User;

namespace Bursify.Data.EF.SponsorUser
{
    public class Sponsor : IEntity
    {
        public Sponsor()
        {
            Sponsorhips = new List<Sponsorship>();
        }

        public int BursifyUserId { get; set; }
        public int NumberOfStudentsSponsored { get; set; }
        public int NumberOfSponsorships { get; set; }
        public int NumberOfApplicants { get; set; }
        public int BursifyRank { get; set; }
        public int BursifyScore { get; set; }

        public int Id
        {
            get { return BursifyUserId; }
        }

        public virtual BursifyUser BursifyUser { get; set; }
        public ICollection<Sponsorship> Sponsorhips { get; set; }
        public virtual ICollection<CampaignSponsor> CampaignSponsors { get; set; }
    }
}