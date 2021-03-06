﻿(function (app) {
    'use strict';

    app.controller('sponsorshipCtrl', sponsorshipCtrl);

    sponsorshipCtrl.$inject = ['$scope', '$rootScope', 'apiService', 'notificationService', '$routeParams', '$mdDialog', '$mdMedia' , '$mdBottomSheet', '$mdToast'];

    function sponsorshipCtrl($scope, $rootScope, apiService, notificationService, $routeParams, $mdDialog, $mdMedia, $mdBottomSheet, $mdToast) {
        $scope.pageClass = 'page-view-sponsorship';
      
        this.isOpen = false;

 
        $scope.printer = function () {
           
            window.print();
        }


        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };

        apiService.get('/api/sponsorship/GetSponsorship/?sponsorshipId=' + $routeParams.sponsorshipId, null,
        sponsorshipLoadCompleted,
        sponsorshipLoadFailed);
    

        $scope.diffDays = {};

        $scope.Similar = {};
        function similarLoadCompleted(result) {
            $scope.Similar = result.data;
        }

        function similarLoadFailed() {
            notificationService.displayError("Could not load similar.");
         }
       
        $scope.myFields = {};
        function sponsorshipLoadCompleted(result) {
            $scope.Sponsorship = result.data;
            apiService.get('/api/sponsorship/GetSimilar/?sponsorshipId=' + $routeParams.sponsorshipId, null,
            similarLoadCompleted,
            similarLoadFailed);
            var oneDay = 24*60*60*1000;	// hours*minutes*seconds*milliseconds
            var firstDate = new Date();
            var secondDate = new Date($scope.Sponsorship.ClosingDate);
           
            var x = Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay));
            $scope.diffDays = ~~x;

          
       
            if ($scope.Sponsorship.StudyFields != 'All') {
                $scope.x = $scope.Sponsorship.StudyFields;
                $scope.Sponsorship.StudyFields = $scope.x.split(",");
                $scope.Sponsorship.StudyFields.pop();
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


            apiService.get('/api/student/Getstudent/?studentId=' + $rootScope.repository.loggedUser.userIden, null,
            studentLoadCompleted,
            studentLoadFailed);
        }

        $scope.Student = {};
        $scope.Quali = true;
        $scope.level = true;
        function studentLoadCompleted(result) {
            $scope.Student = result.data;

            if ($scope.Student.AverageMark < $scope.Sponsorship.AverageMarkRequired) {
                $scope.Quali = false;
            }

            if ($scope.Sponsorship.EducationLevel == 'High School') {
                if ($scope.Student.CurrentOccupation != 'High School') {
                    $scope.level = false;
                } 
            }


            if ($scope.Sponsorship.EducationLevel == 'Tertiary') {
                if ($scope.Student.CurrentOccupation == 'High School') {
                    $scope.level = false;
                }
                
                if ($scope.Student.EducationLevel == 'Grade 12') {
                    $scope.level = true;
                }
            }

          
            if ($scope.level && $scope.Quali) {
                apiService.get('/api/report/GetMostRecentReport/?studentId=' + $rootScope.repository.loggedUser.userIden, null,
                reportCompleted,
                reportFailed);
            }
        


        }


        function dataSubject(name, mark) {
            this.name = name;
            this.mark = mark;
        }

        function dataSubject(name, mark, sMark) {
            this.name = name;
            this.mark = mark;
            this.smark = sMark;
        }

        $scope.nSubs = false;
        $scope.fSubs = false;
        $scope.NotSubs = [];
        $scope.FoundSubs = [];
        $scope.ReportSubs = {};
        //checking subjects now 

        function reportCompleted(result) {
           
            $scope.ReportSubs = result.data;
            if (!$scope.level && !$scope.Quali) {
                for (var i = 0; i < $scope.Sponsorship.Requirements.length; i++) {
                    for (var k = 0; k < $scope.ReportSubs.Subjects.length; k++) {
                        if ($scope.Sponsorship.Requirements[i].Name == $scope.ReportSubs.Subjects[k].Name) {
                            console.log("Found: " + $scope.Sponsorship.Requirements[i].Name);
                            if ($scope.Sponsorship.Requirements[i].MarkRequired > $scope.ReportSubs.Subjects[k].MarkAcquired) {
                                $scope.fSubs = true;
                                $scope.FoundSubs.push(new dataSubject($scope.Sponsorship.Requirements[i].Name, $scope.Sponsorship.Requirements[i].MarkRequired, $scope.ReportSubs.Subjects[k].MarkAcquired));
                                break;
                            }
                        } else {
                            console.log("Not: " + $scope.Sponsorship.Requirements[i].Name);
                            $scope.nSubs = true;
                            $scope.NotSubs.push(new dataSubject($scope.Sponsorship.Requirements[i].Name, $scope.Sponsorship.Requirements[i].MarkRequired));
                            break;
                        }
                    }
                }
            }
            
        }

        function reportFailed() {
            notificationService.displayError('Could not load student report.')
        }

        function studentLoadFailed() {
            notificationService.displayError('Could not load student.');
        }
        

        function sponsorshipLoadFailed() {
            notificationService.displayInfo("Failed");
        }

        $scope.StudentSponsorshipVM = {
           
            "SponsorshipId": "",
            "ApplicationDate": "",
            "Status": "",
            "SponsorshipOffered": ""
        }


    
      

        $scope.studentApply = function () {
            $scope.StudentSponsorshipVM.StudentId = $rootScope.repository.loggedUser.userIden;
            $scope.StudentSponsorshipVM.SponsorshipId = $routeParams.sponsorshipId;
            var today = new Date();
            $scope.StudentSponsorshipVM.ApplicationDate = today;
            $scope.StudentSponsorshipVM.Status = "Pending";
            $scope.StudentSponsorshipVM.SponsorshipOffered = "false";
            apiService.post('/api/student/ApplyForSponsorship', $scope.StudentSponsorshipVM, ApplicationCompleted, ApplicationFailed);
        }

  

        function ApplicationCompleted() {
            notificationService.displaySuccess("You have successfully applied for this sponsorship.");
        }

        function ApplicationFailed() {
            notificationService.displayInfo("Failed");
        }


    }

})(angular.module('BursifyApp'));

