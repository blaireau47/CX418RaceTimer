//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CX418DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class Race
    {
        public int ID { get; set; }
        public Nullable<System.DateTime> RaceStartingTime { get; set; }
        public string RaceName { get; set; }
        public Nullable<System.DateTime> RaceStartedTime { get; set; }
        public string Description { get; set; }
        public Nullable<int> LapMax { get; set; }
        public Nullable<int> RaceLenght { get; set; }
        public int EventId { get; set; }
    }
}
