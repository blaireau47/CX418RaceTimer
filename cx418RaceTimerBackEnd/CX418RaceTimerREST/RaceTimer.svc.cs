using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using CX418DataAccess;

namespace CX418.RESTServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class RaceTimer : IRaceTimer
    {
        public int AddLapTime(LapInformation _lapInfo)
        {
         
            int curLapTimeSeconds = 0;

            using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
            {

                //context.LapTimes.Add(new CX418DataAccess.LapTime { bib = _bib.ToString(), LapTime1 = DateTime.Now, RaceId = _raceId });
                //context.LapTimes.Add(new CX418DataAccess.LapTime { bib = _lapInfo.BibId.ToString(), LapTime1 = _lapInfo.LapTime, RaceId = _lapInfo.RaceId });

                curLapTimeSeconds = context.sp_InsertLapTime(_lapInfo.BibId, _lapInfo.RaceId, _lapInfo.LapEndTime);
                //rowChange = context.SaveChanges();
            }



            return curLapTimeSeconds; // rowChange == 1 ? true : false;
        }
    
        public int AddRace(RaceInformation _raceInfo)
        {
            int rowChange = -1;
            int curIdRace = -1;

            using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities()) {

                CX418DataAccess.Race raceObj = new CX418DataAccess.Race();
                raceObj.RaceName = _raceInfo.RaceName;
                raceObj.RaceStartingTime = _raceInfo.RaceStartingTime;
                raceObj.RaceStartedTime = _raceInfo.RaceStartingTime;
                raceObj.Description = _raceInfo.Description;
                raceObj.RaceLenght = _raceInfo.RaceLenght;
                raceObj.EventId = _raceInfo.EventId;

                context.Races.Add(raceObj);

                rowChange = context.SaveChanges();
                curIdRace = raceObj.ID;
            }



            return curIdRace;
        }

        public RaceInformation GetRace(string _id)
        {

            int intRaceId;

            RaceInformation retValue = null;
            if (int.TryParse(_id, out intRaceId))
            {

                using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
                {

                    var race = (from t in context.Races
                                 where t.ID == intRaceId
                                select t).FirstOrDefault();

                    if(race != null)
                    {
                        retValue = new RaceInformation(race);
                    }                                         
                }
            }

            return retValue;
        }

        public EventInformation GetEvent(string _id)
        {

            int intEventId;

            EventInformation retValue = null;
            if (int.TryParse(_id, out intEventId))
            {

                using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
                {

                    var curEvent = (from t in context.Events
                                where t.ID == intEventId
                                select t).FirstOrDefault();

                    if (curEvent != null)
                    {
                        retValue = new EventInformation(curEvent);
                    }
                }
            }

            return retValue;
        }

        public int StartRace(int _raceID, DateTime _startedTime)
        {
            // disconnected existing entity 
            var curRace = new CX418DataAccess.Race() { ID = _raceID, RaceStartedTime = _startedTime };

            //using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
            //{
            //    context.Entry(curRace).State = curRace.ID == 0 ? EntityState.Added : EntityState.Modified;

            //    context.SaveChanges();
            //}

            return _raceID;
        }
        
        public string HelloWorld()
        {

            //Assembly assembly = Assembly.LoadFrom("MyAssembly.dll");
            //Version ver = assembly.GetName().Version;

            return "HelloWorld and the moon also";
        }

        public string HelloYou(string _name)
        {
            return string.Format("HelloWorld and {0} also",_name);
        }

        public LapInformation GetLastLapTime(string _racerBid, string _raceId)
        {
            int intRaceId;

            LapInformation retValue = null;
            if (int.TryParse(_raceId, out intRaceId))
            {

                using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
                {

                    var lapInfo = (from t in context.LapTimes
                                where t.RaceId == intRaceId && t.bib == _racerBid
                                select t).FirstOrDefault();

                    if (lapInfo != null)
                    {
                        retValue = new LapInformation(lapInfo);
                    }
                }
            }

            return retValue;
        }

        public List<LapInformation> GetLapTimes(string _racerBid, string _raceId)
        {
            List<LapInformation> retValue = new List<LapInformation>();
            int intRaceId;

            if (int.TryParse(_raceId, out intRaceId))
            {
                using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
                {

                    var laps = (from t in context.LapTimes
                                 where t.RaceId == intRaceId && t.bib == _racerBid
                                 select t);

                    foreach (var lapEntity in laps)
                    {

                        LapInformation newLapInfo = new LapInformation(lapEntity);

                        retValue.Add(newLapInfo);


                    }
                }

            }



            return retValue;
        }

        public List<LapInformation> GetRaceLapTimes(string _raceId)
        {
            List<LapInformation> retValue = new List<LapInformation>();
            int intRaceId;

            if (int.TryParse(_raceId, out intRaceId))
            {
                using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
                {

                    var laps = (from t in context.LapTimes
                                where t.RaceId == intRaceId
                                select t);

                    foreach (var lapEntity in laps)
                    {

                        LapInformation newLapInfo = new LapInformation(lapEntity);

                        retValue.Add(newLapInfo);


                    }
                }

            }



            return retValue;
        }
        
        public List<RaceInformation> GetRaces(string eventId)
        {
            List<RaceInformation> retValue = new List<RaceInformation>();
            int intEventId;

            if(int.TryParse(eventId, out intEventId))
            {
                using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
                {

                    var races = (from t in context.Races
                                 where t.EventId == intEventId
                                 select t);

                    foreach (var raceEntity in races)
                    {

                        RaceInformation newRaceInfo = new RaceInformation(raceEntity);

                        retValue.Add(newRaceInfo);


                    }
                }

            }



            return retValue;
        }

        public List<EventInformation> GetEvents()
        {
            List<EventInformation> retValue = new List<EventInformation>();
            
            using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
            {

                var events = (from t in context.Events                                 
                                select t);

                foreach (var eventEntity in events)
                {
                    EventInformation newEventInfo = new EventInformation(eventEntity);

                    retValue.Add(newEventInfo);
                }
            }

            return retValue;
        }
        
        public Race[] GetRaceDayRaces(string eventId)
        {
            throw new NotImplementedException();
        }
        
        public int AddEvent(EventInformation _eventInfo)
        {
            int curId = -1;


            using (CX418DataAccess.cx418timingEntities context = new CX418DataAccess.cx418timingEntities())
            {

                Event eventObj = new CX418DataAccess.Event();

                eventObj.EventName = _eventInfo.EventName;
                eventObj.MultiDay = _eventInfo.MultiDayEvent;
                eventObj.MultiRace = _eventInfo.MultiRaceEvent;
                eventObj.Description = _eventInfo.Description;
                eventObj.StartDay = _eventInfo.EventStartingDate;
                eventObj.EndDay = _eventInfo.EventEndingDate;
                

                context.Events.Add(eventObj);
                int rowChange = context.SaveChanges();
                curId = eventObj.ID;
            }



            return curId;
        }
    }
}
