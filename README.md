# `geoip-lookup`

Tries to cache IP addresses / location lookup via LevelDB, and otherwise pulls the data via a "demo" RESTful API provided by MaxMind.

It's not very clear if this is "legal" as you should probably get a proper license to do this if you're doing it on a large scale.

Essentially hits 

	https://www.maxmind.com/geoip/v2.1/city/<ip address>?demo=1

which returns JSON in the following format

	{
	   "country":{
	      "iso_code":"US",
	      "names":{
	         "pt-BR":"Estados Unidos",
	         "es":"Estados Unidos",
	         "ru":"Сша",
	         "en":"United States",
	         "zh-CN":"美国",
	         "fr":"&Eacute;tats-Unis",
	         "de":"USA",
	         "ja":"アメリカ合衆国"
	      },
	      "geoname_id":6252001
	   },
	   "location":{
	      "longitude":-121.895,
	      "latitude":37.3394,
	      "time_zone":"America/Los_Angeles",
	      "metro_code":807
	   },
	   "subdivisions":[
	      {
	         "iso_code":"CA",
	         "names":{
	            "pt-BR":"Calif&oacute;rnia",
	            "es":"California",
	            "ru":"Калифорния",
	            "en":"California",
	            "zh-CN":"加利福尼亚州",
	            "fr":"Californie",
	            "de":"Kalifornien",
	            "ja":"カリフォルニア州"
	         },
	         "geoname_id":5332921
	      }
	   ],
	   "city":{
	      "names":{
	         "en":"San Jose",
	         "fr":"San Jos&eacute;",
	         "pt-BR":"San Jos&eacute;",
	         "de":"San Jos&eacute;",
	         "ja":"サンノゼ",
	         "es":"San Jos&eacute;",
	         "ru":"Сан-Хосе"
	      },
	      "geoname_id":5392171
	   },
	   "continent":{
	      "names":{
	         "pt-BR":"Am&eacute;rica do Norte",
	         "es":"Norteam&eacute;rica",
	         "ru":"Северная Америка",
	         "en":"North America",
	         "zh-CN":"北美洲",
	         "fr":"Am&eacute;rique du Nord",
	         "de":"Nordamerika",
	         "ja":"北アメリカ"
	      },
	      "geoname_id":6255149,
	      "code":"NA"
	   },
	   "maxmind":{
	      "queries_remaining":24
	   },
	   "registered_country":{
	      "iso_code":"US",
	      "names":{
	         "pt-BR":"Estados Unidos",
	         "es":"Estados Unidos",
	         "ru":"Сша",
	         "en":"United States",
	         "zh-CN":"美国",
	         "fr":"&Eacute;tats-Unis",
	         "de":"USA",
	         "ja":"アメリカ合衆国"
	      },
	      "geoname_id":6252001
	   },
	   "traits":{
	      "autonomous_system_number":<some integer>,
	      "ip_address":"<ip address>",
	      "organization":"<some organization>",
	      "isp":"<some ISP>",
	      "autonomous_system_organization":"<some system organization>"
	   }
	}

