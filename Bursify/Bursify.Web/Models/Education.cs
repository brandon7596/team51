﻿namespace Bursify.Web.Models
{
    public class Education
    {
        /*
        *   StudyField at InstitutionName
        *   if(currentOccupation == Unemployed) Uemployed
        */
        public int StudentId { get; set; }
        public string InstitutionName { get; set; }
        public string StudyField { get; set; }
        public string CurrentOccupation { get; set; }
    }
}