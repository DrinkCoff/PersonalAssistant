/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */
 
// Calendar Variables 
var hinduHolidays = "webcal://www.calendarlabs.com/ical-calendar/ics/48/Hindu_Holidays.ics";
var usHolidays = "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics";
var allCalendars = [
          {
            symbol: "calendar-check",
            url: usHolidays
          },
		  {
			symbol: "calendar-plus",
            url: hinduHolidays
		  }
        ];
		
// Weather Variables
var cityName = "Fishers,US";
var cityId = "4257494";
var weatherApiKey = "bd4a10c5293514c0246d38d84e98ed78";
var weatherUnit = "imperial";

// GooglePhotos Variables
var Ganapati = "AEHmk2TWeKQM0XdyPCZ1XOcNU1Wawts51V_FdppY6UKgdnHovz3rLIF7xZZau6O17yUeJ8fhDkIU";
var LordRam = "AEHmk2SGWF1a6-kJofMsM9N6xGMu8l75DJ_XNkRK2CpOgvmVij_ZCGI69n-Ng7-2XoKVeWvtbKfN";

var Aarna3rdBirthday = "AEHmk2TAPTEG5IEKTLcMnOLnIuWu0DbnGLg7Gq5isQ6OOoGMKCQbZgRNIJjBBqc7ZZpnSvPHI3cb";
var Aarna = "AEHmk2R7gveTJRtTGX7t8QBW7Z_MZjJpQs11zuUkyy1SoyXnC2d5I4ZnaqPlfhkTLx_KC29pjh4w";

// Baby Countdown
var babyDueDate = 'August 25 2020';
function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  //var seconds = Math.floor( (t/1000) % 60 );
  //var minutes = Math.floor( (t/1000/60) % 60 );
  //var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    //'hours': hours,
    //'minutes': minutes,
    //'seconds': seconds
  };
}

var config = {
  address: "0.0.0.0", // Address to listen on, can be:
  // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
  // - another specific IPv4/6 to listen on a specific interface
  // - "0.0.0.0" to listen on any interface
  // Default, when address config is left out, is "localhost"
  port: 8080,
  ipWhitelist: [], // Set [] to allow all IP addresses
  // or add a specific IPv4 of 192.168.1.5 :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
  // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

  language: "en",
  timeFormat: 12,
  units: "metric",
 
  modules: [
	{
		module: 'MMM-Carousel',
		position: 'bottom_bar', // Required only for navigation controls
		config: {
			transitionInterval: 10000,
			showPageIndicators: true,
			showPageControls: true,
			ignoreModules: ['clock', 'currentweather', 'MMM-BabyCountdown'],
			mode: 'slides',
			slides: {
				main: ['clock', 'calendar', 'currentweather', 'weatherforecast', 'helloworld', 'MMM-BabyCountdown'],
				//"Slide 2": ['calendar', 'weatherforecast'],
				"Slide 2": ['MMM-GooglePhotos']
			}
		}
	},
	{
		module: 'MMM-Remote-Control',
		// uncomment the following line to show the URL of the remote control on the mirror
		position: 'bottom_left',
		// you can hide this module afterwards from the remote control itself
		config: {
			customCommand: {},  // Optional, See "Using Custom Commands" below
			customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
			showModuleApiMenu: true, // Optional, Enable the Module Controls menu
			apiKey: "",         // Optional, See API/README.md for details
		}
	},
	
    {
      module: "alert",
    },
	{
		module: "helloworld",
		position: "lower_third",	// This can be any of the regions.
		config: {
			// See 'Configuration options' for more information.
			text: "Jay Shree Krishna"
		}
	},
	{
		module: "MMM-BabyCountdown",
		position: "bottom_bar",	// This can be any of the regions.
		config: {
			// See 'Configuration options' for more information.
			text: "Days Until We Meet Our Next Baby: " + getTimeRemaining(babyDueDate).days
		}
	},
    {
      module: "updatenotification",
      position: "top_bar"
    },
    {
      module: "clock",
      position: "top_left"
    },
	{
      module: "currentweather",
      position: "top_right",
      config: {
        location: cityName,
        locationID: cityId,  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        appid: weatherApiKey,
		units: weatherUnit
      }
    },
    {
      module: "calendar",
      header: "US Holidays",
      position: "top_left",
      config: {
        calendars: allCalendars
      }
    },
	{
      module: "weatherforecast",
      position: "top_right",
      header: "Weather Forecast",
      config: {
        location: cityName,
        locationID: cityId,  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        appid: weatherApiKey,
		units: weatherUnit,
		maxNumberOfDays: '10',
		//showRainAmount: 'true',
		colored: 'true'
      }
    },
    /*{
      module: "compliments",
      position: "lower_third"
    },
    {
      module: "newsfeed",
      position: "bottom_bar",
      config: {
        feeds: [
          {
            title: "New York Times",
            url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
          }
        ],
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true
      } 
    },*/
	{
	  module: "MMM-GooglePhotos",
	  position: "middle_center",
	  config: {
		albumId: [ LordRam ], 	// your album id(s) from result of `auth_and_test.js`
		refreshInterval: 1000*200,							// Number of milliseconds before showing a different photo
		scanInterval: 1000*60*10,							// too many scans might cause API quota limit also
		//note(2018-07-29). It is some weird. API documents said temporal image url would live for 1 hour, but it might be broken shorter. So, per 10 min scanning could prevent dead url.

		sort: "time", 												//'time', 'reverse', 'random'
		showWidth: "1080px", 									// how large the photo will be shown as. (e.g;'100%' for fullscreen)
		showHeight: "1080px",
		originalWidthPx: 1080, 								// original size of loaded image. (related with image quality)
		originalHeightPx: 1080, 								// Bigger size gives you better quality, but can give you network burden
		opacity: 1, 													// target "opacity" property (https://www.w3schools.com/cssref/css3_pr_opacity.asp)
		mode: "hybrid", 											// "cover" or "contain" (https://www.w3schools.com/cssref/css3_pr_background-size.asp)
																						// "hybrid": will change "cover" and "contain" automatically based on aspect ratio
		showDateLabel: true,									// If True, shows a label of how long ago the photo was taken (e.g. 2 years ago, 7 days ago, etc...)
	  }
	},
  ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
