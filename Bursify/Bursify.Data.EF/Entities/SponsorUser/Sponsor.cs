﻿using System.Collections.Generic;
using Bursify.Data.EF.Entities.Bridge;
using Bursify.Data.EF.Entities.User;

namespace Bursify.Data.EF.Entities.SponsorUser
{
    public class Sponsor : IEntity
    {
        public Sponsor()
        {
            Sponsorhips = new List<Sponsorship>();
        }

        //Unique identifier
        //foreign key
        public int ID { get; set; }
        public string CompanyName { get; set; }
        public string Industry { get; set; }
        public string Website { get; set; }
        public string Location { get; set; }
        public string CompanyEmail { get; set; }
        public int NumberOfStudentsSponsored { get; set; }
        public int NumberOfSponsorships { get; set; }
        public int NumberOfApplicants { get; set; }
        public int BursifyRank { get; set; }
        public int BursifyScore { get; set; }

        public virtual BursifyUser BursifyUser { get; set; }
        public virtual Account Account { get; set; }
        public ICollection<Sponsorship> Sponsorhips { get; set; }
        public virtual ICollection<CampaignSponsor> CampaignSponsors { get; set; } 
    }
}