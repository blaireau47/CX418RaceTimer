using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Http;

namespace CX418.RESTServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IRaceTimer
    {
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "HelloYou/{name}")]
        string HelloYou(string name);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "HelloWorld")]
        string HelloWorld();

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetRace/{id}")]
        RaceInformation GetRace(string id);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetRaces/{eventId}")]
        List<RaceInformation> GetRaces(string eventId);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetEvents")]
        List<EventInformation> GetEvents();

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetEvent/{id}")]
        EventInformation GetEvent(string id);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetRaceDayRaces/{eventId}")]
        CX418DataAccess.Race[] GetRaceDayRaces(string eventId);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetLastLapTime/{racerBid}/{raceId}")]
        LapInformation GetLastLapTime(string racerBid, string raceId);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetLapTimes/{racerBid}/{raceId}")]
        List<LapInformation> GetLapTimes(string racerBid, string raceId);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetRaceLapTimes/{raceId}")]
        List<LapInformation> GetRaceLapTimes(string raceId);


        [OperationContract]
        [WebInvoke(Method = "Put", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "StartRace")]
        int StartRace(int raceID, DateTime raceStartedTime);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AddLapTime")]
        int AddLapTime(LapInformation lapInfo); // int BibId, int RaceId, DateTime LapTime);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AddRace")]
        int AddRace(RaceInformation raceInfo);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AddEvent")]
        int AddEvent(EventInformation eventInfo);




    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class LapInformation
    {
        int raceId;
        int bibId;
        DateTime lapEndTime;
        int lapTime;
        int lapNumber;
        int currentRaceTime;

        [DataMember]
        public int RaceId
        {
            get { return raceId; }
            set { raceId = value; }
        }


        [DataMember]
        public int BibId
        {
            get { return bibId; }
            set { bibId = value; }
        }

        [DataMember]
        public DateTime LapEndTime
        {
            get { return lapEndTime; }
            set { lapEndTime = value; }
        }
        [DataMember]
        public int LapNumber { get => lapNumber; set => lapNumber = value; }
        [DataMember]
        public int CurrentRaceTime { get => currentRaceTime; set => currentRaceTime = value; }

        public LapInformation(CX418DataAccess.LapTime _lapTimeEntity)
        {
            this.BibId = Int32.Parse(_lapTimeEntity.bib);
            this.lapEndTime = _lapTimeEntity.LapEndTime;
            this.raceId = _lapTimeEntity.RaceId;
            if(_lapTimeEntity.LapTime1 != null)
            {
                this.lapTime = _lapTimeEntity.LapTime1 ?? 0;
            }

            this.currentRaceTime = _lapTimeEntity.CurrentRaceTime ?? 0;
            
            this.lapNumber = _lapTimeEntity.LapNumber ?? 0;




        }
    }

    [DataContract]
    public class RaceInformation
    {
        int raceId;
        string raceName;
        DateTime raceStartingTime;
        int raceLenght;
        string description;
        int lapMax;
        int eventId;
        DateTime raceStartedTime;

        [DataMember]
        public int RaceId
        {
            get { return raceId; }
            set { raceId = value; }
        }


        [DataMember]
        public int RaceLenght
        {
            get { return raceLenght; }
            set { raceLenght = value; }
        }

        [DataMember]
        public DateTime RaceStartingTime
        {
            get { return raceStartingTime; }
            set { raceStartingTime = value; }
        }
        [DataMember]
        public string RaceName { get => raceName; set => raceName = value; }
        [DataMember]
        public string Description { get => description; set => description = value; }
        [DataMember]
        public int LapMax { get => lapMax; set => lapMax = value; }
        [DataMember]
        public int EventId { get => eventId; set => eventId = value; }
        [DataMember]
        public DateTime RaceStartedTime { get => raceStartedTime; set => raceStartedTime = value; }

        public RaceInformation(CX418DataAccess.Race _raceEntity)
        {
            this.RaceName = _raceEntity.RaceName;
            this.description = _raceEntity.Description;
            this.RaceId = _raceEntity.ID;
            this.EventId = _raceEntity.EventId;
            if(_raceEntity.RaceLenght != null)
            {
                this.RaceLenght = _raceEntity.RaceLenght ?? 0;
            }
            if (_raceEntity.RaceStartingTime != null)
            {
                this.RaceStartingTime = _raceEntity.RaceStartingTime ?? DateTime.Now;
            }
            if (_raceEntity.LapMax != null)
            {
                this.LapMax = _raceEntity.LapMax ?? 0;
            }
            if (_raceEntity.RaceStartedTime != null)
            {
                this.raceStartedTime = _raceEntity.RaceStartedTime ?? new DateTime();
            }




        }
    }


    [DataContract]
    public class EventInformation
    {
        int eventId;
        string eventName;
        DateTime eventStartingDate;
        DateTime eventEndingDate;
        bool multiDayEvent;
        bool multiRaceEvent;
        string description;
        string location;


        [DataMember]
        public int EventId { get => eventId; set => eventId = value; }
        [DataMember]
        public string EventName { get => eventName; set => eventName = value; }
        [DataMember]
        public DateTime EventStartingDate { get => eventStartingDate; set => eventStartingDate = value; }
        [DataMember]
        public DateTime EventEndingDate { get => eventEndingDate; set => eventEndingDate = value; }
        [DataMember]
        public bool MultiDayEvent { get => multiDayEvent; set => multiDayEvent = value; }
        [DataMember]
        public bool MultiRaceEvent { get => multiRaceEvent; set => multiRaceEvent = value; }
        [DataMember]
        public string Description { get => description; set => description = value; }
        [DataMember]
        public string Location { get => location; set => location = value; }


        public EventInformation(CX418DataAccess.Event _eventEntity)
        {
            this.eventId = _eventEntity.ID;
            this.eventName = _eventEntity.EventName;
            this.EventStartingDate = _eventEntity.StartDay;
            this.eventEndingDate = _eventEntity.EndDay;
            this.MultiDayEvent = _eventEntity.MultiDay ?? false;
            this.multiRaceEvent = _eventEntity.MultiRace ?? false;
            this.description = _eventEntity.Description;
            

        }
    }
}
