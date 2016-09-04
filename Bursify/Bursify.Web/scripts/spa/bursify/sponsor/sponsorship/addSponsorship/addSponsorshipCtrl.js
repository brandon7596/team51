﻿ (function (app) {
    'use strict';


    app.controller('addSponsorshipCtrl', addSponsorshipCtrl);

    addSponsorshipCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'apiService', 'notificationService', '$mdDialog', '$mdMedia', '$location', '$compile'];

    function addSponsorshipCtrl($scope,$rootScope, $timeout, apiService, notificationService, $mdDialog, $mdMedia, $location, $compile) {

        $mdDialog.hide();

        $scope.pageClass = 'page-add-';
    
        $scope.provinces = $scope.provinces || [
                 { id: 1, name: 'All Provinces' },
                 { id: 2, name: 'Eastern Cape' },
                 { id: 3, name: 'Free State' },
                 { id: 4, name: 'Gauteng' },
                 { id: 5, name: 'Kwa-Zulu Natal' },
                 { id: 6, name: 'Limpopo' },
                 { id: 7, name: 'Mpumalanga' },
                 { id: 8, name: 'Northern Cape' },
                 { id: 9, name: 'North West' },
                 { id: 10, name: 'Western Cape' },

        ];

   


        $scope.ages = ['16-20', '21-25', '26-30', 'Any'];

        $scope.races = ['African', 'Asain', 'Indian', 'Coloured', 'White'];

        $scope.places = [
            "University of Cape Town",
"University of Fort Hare",
"University of the Free State",
"University of KwaZulu-Natal",
"University of Limpopo",
"North-West University",
"University of Pretoria",
"Rhodes University",
"University of Stellenbosch",
"University of the Western Cape",
"University of Johannesburg",
"Nelson Mandela Metropolitan University",
"University of South Africa",
"University of Venda",
"University of Zululand",
"Cape Peninsula University of Technology",
"Walter Sisulu University",
"Central University of Technology",
"Durban University of Technology",
"Mangosuthu University of Technology",
"University of Mpumalanga",
"Sol Plaatje University",
"Tshwane University of Technology",
"Vaal University of Technology",
 "AFDA",
 "Akademia",
 "Aros",
 "Boston City Campus & Business College",
 "Cornerstone Institute",
 "Centurion Academy",
 "CTI Education Group",
 "Damelin",
 "Helderberg College",
 "IMM Graduate School of Marketing",
 "Inscape Design College",
 "Management College of Southern Africa",
 "Midrand Graduate Institute",
 "Milpark Business School",
 "Monash South Africa",
 "Oval Campus",
 "Rosebank College",
 "Varsity College",
 "Vega",
 "Other"
        ];
   
        $scope.fields = null;
        $scope.loadFields = function () {

            return $timeout(function () {
                $scope.fields = $scope.fields || [
                  { id: 1, name: 'Art' },
                  { id: 2, name: 'Design' },
                  { id: 3, name: 'Architecture' },
                  { id: 4, name: 'Accounting' },
                  { id: 5, name: 'Economics' },
                 { id: 6, name: 'Finance' },
                 { id: 7, name: 'Civil Engineering' },
                 { id: 8, name: 'Education' },
                 { id: 9, name: 'Electrical Engineering' },
                 { id: 10, name: 'Mechanical Engineering' },
                 { id: 11, name: 'Extraction Metallurgy' },
                 { id: 12, name: 'Industrial Engineering' },
                 { id: 13, name: 'Mining Engineering' },
                 { id: 14, name: 'Mineral Surveying' },
                 { id: 15, name: 'Town Planning' },
                  { id: 16, name: 'Engineering' },
                 { id: 17, name: 'Health Sciences' },
                 { id: 18, name: 'Biokinetics' },
                 { id: 19, name: 'Sport Development' },
                 { id: 20, name: 'Sport Management' },
                  { id: 21, name: 'Somatology' },
                  { id: 22, name: 'Social Work' },
                { id: 23, name: 'Communication & Language' },
                { id: 24, name: 'Geography & Anthropology' },
                { id: 25, name: 'Philosophy & Religion' },
                { id: 26, name: 'Polotics' },
                 { id: 27, name: 'Psychology' },
                  { id: 28, name: 'Public Relations' },
                 { id: 29, name: 'Law' },
                 { id: 30, name: 'Human Resource Management' },
                 { id: 31, name: 'Information Management' },
                 { id: 32, name: 'Public Management & Governance' },
                 { id: 33, name: 'Tourism Development' },
                 { id: 34, name: 'Logistics Management' },
                 { id: 35, name: 'Marketing Management' },
                 { id: 36, name: 'Transport Economics' },
                 { id: 37, name: 'Hospitality Management' },
                 { id: 38, name: 'Logistics' },
                 { id: 39, name: 'Management' },
                 { id: 40, name: 'Business Information Technology' },
                 { id: 41, name: 'Food & Beverage Operations' },
                 { id: 42, name: 'Information Technology' },
                 { id: 43, name: 'Informatics' },
                 { id: 44, name: 'Zoology' },
                 { id: 45, name: 'Environmental Management' },
                 { id: 46, name: 'Geography' },
                 { id: 47, name: 'Human Physiologo' },
                 { id: 48, name: 'Biochemistry' },
                 { id: 49, name: 'Sport Sciences' },
                 { id: 50, name: 'Computational Science' },
                 { id: 51, name: 'Mathematical Statistics' },
                 { id: 52, name: 'Mathematics' },
                 { id: 53, name: 'Chemistry' },
                 { id: 54, name: 'Physics' },
                 { id: 55, name: 'Food Technology' },
                 { id: 56, name: 'Applied Mathematics' },
                 { id: 57, name: 'Computer Science' },
                ];
            }, 10);
        };
      
        $scope.Sponsorship = {
        ID : "",
        SponsorId : "",
        Name : "",
        Description : "",
        StartingDate : "",
        ClosingDate : "",
        EssayRequired : "",
        SponsorshipValue : "",
        StudyFields : "",
        Province : "",
        AverageMarkRequired : "",
        EducationLevel : "",
        InstitutionPreference : "",
        GenderPreference : "",
        RacePreference : "",
        DisabilityPreference : "",
        ExpensesCovered : "",
        TermsAndConditions : "",
        SponsorshipType : "",
        AgeGroup : "",
        Rating : "",
        };

        $scope.Requirements = [{ "Name": "", "MarkRequired": "" }];

        $scope.Subjects = [
                       "Overall Average",
                      "Afrikaans SAL" ,
                    "Afrikaans FAL" ,
                    "Afrikaans HL" ,
                     "English HL" ,
                    "English FAL" ,
                     "IsiNdebele HL" ,
                     "IsiNdebele FAL" ,
                     "IsiXhosa HL" ,
                      "IsiXhosa FAL" ,
                      "IsiZulu HL" ,
                      "IsiZulu FAL" ,
                       "Sepedi HL" ,
                        "Sepedi FAL" ,
                       "Sesotho HL" ,
                         "Sesotho FAL" ,
                         "Setswana HL" ,
                         "Setswana FAL" ,
                         "Siswati HL" ,
                         "Siswati FAL" ,
                         "Tshivenda HL" ,
                         "Tshivenda FAL" ,
                         "Xitsonga HL" ,
                         "Xitsonga FAL" ,
                         "Accounting" ,
                         "Agricultural Sciences" ,
                         "Agricultural Technology" ,
                         "Agricultural Management Practices" ,
                         "Business Studies" ,
                         "Computer Application Technology" ,
                         "Consumer Studies" ,
                         "Civil Technology" ,
                         "Dance Studies" ,
                         "Design" ,
                         "Dramatic Arts" ,
                         "Economics" ,
                         "Electrical Technology" ,
                         "Engineering Graphic and Design" ,
                         "Geography" ,
                         "History" ,
                         "Information Technology" ,
                         "Hospitality Studies" ,
                         "Life Orientation" ,
                         "Life Science" ,
                         "Mathematics" ,
                         "Mathematical Literacy" ,
                         "Mechanical Technology" ,
                         "Music" ,
                         "Physical Sciences" ,
                         "Religion Studies" ,
                         "Tourism" ,
                         "Visual Arts" 

        ];


        $scope.count = 0;

        $scope.appendText = function () {

            $scope.count = $scope.count + 1;

            angular.element(document.getElementById('MarksInputAdd')).append($compile("  <div class=\'row\'><div class=\'col-md-9\'><div class=\'form-group\'><select class=\'form-control\' style=\'width: 100%;\' tabindex=\'-1\' aria-hidden=\'true\' ng-model=\'Requirements[" + $scope.count + "].Name\'><option ng-value=\'subject\' ng-repeat=\'subject in Subjects\' style=\'text-align: center;\'>{{subject}}</option></select></div> </div><div class=\'col-md-3\'><div class=\'form-group\'><input ng-model=\'Requirements[" + $scope.count + "].MarkRequired\' type=\'number\' class=\'form-control\' id=\'exampleInputEmail1\' placeholder=\'%\'></div></div></div>")($scope));
 
        }


        $scope.items = ['Registration', 'Examination Fees', 'Tuition Fees', 'Textbooks', 'Accommodation', 'Living Allowance', 'Laptop Allowance', 'Transport'];
        $scope.selected = [];
        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $(document).mousemove(function (e) {
            window.x = e.pageX;
            window.y = e.pageY;
        });

        $scope.data = {
            cb1: false
        };

        $scope.create = function () {
           
            $scope.Sponsorship.SponsorId = $rootScope.ThisUserID;
            $scope.Sponsorship.StudyFields = $scope.selectedField;
            $scope.Sponsorship.Province = $scope.selectedProvince;
            $scope.Sponsorship.AgeGroup = $scope.selectedAgeGroup;
            $scope.Sponsorship.SponsorshipType = "High School";
          
            apiService.post('/api/Sponsorship/SaveSponsorship', $scope.Sponsorship, completed1, failed);
        }

        function completed1() {
            notificationService.displaySuccess("Sponsorship Successfuly Submitted");
            $location.path('/sponsor/s');
        }

        function failed() {
            notificationService.displayError("An error occured.");
        }
        

        $scope.fixPosition = function () {
            
            $timeout(function () {
                $('body').removeAttr('style');
                if (document.getElementsByClassName('md-active')) {
                    for (var i = 0; i < document.getElementsByClassName('md-active').length; i++) {
                        var ele = document.getElementsByClassName('md-active')[i];
                        if (ele.localName == 'div') {
                            var position = y - ele.clientHeight;
                            ele.style.top = position + "px";
                        }
                    }
                }
            }, 0);
        };
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
      
        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };


    }

})(angular.module('BursifyApp'));

