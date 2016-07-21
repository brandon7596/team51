﻿using System;
using Bursify.Data.EF.Repositories;
using Bursify.Data.EF.Uow;
using Bursify.Data.EF.User;
using Bursify.Services;

namespace Bursify.Api.Security
{
    public class MembershipApi
    {
        private readonly BursifyUserRepository userRepository;
        private readonly IUnitOfWorkFactory unitOfWorkFactory;
        private readonly ICryptoService cryptoService ;
        private IUnitOfWorkFactory unityOfWorkFactory;

        public MembershipApi(BursifyUserRepository userRepository, ICryptoService cryptoService, IUnitOfWorkFactory unitOfWorkFactory)
        {
            this.userRepository = userRepository;
            this.cryptoService = cryptoService;
            this.unitOfWorkFactory = unitOfWorkFactory;
        }

        public bool ValidateUser(string email, string password)
        public bool Login(string userName, string password)
        {
            var bursifyUser = userRepository.GetUserByEmail(email);
            if (bursifyUser == null)
            {
                return false;
            }

            if (isPasswordValid(bursifyUser, password))
            {
                return true;
            }

            return false;
        }

        public BursifyUser RegisterUser(string username, string userEmail, string password, string userType)
        {
            BursifyUser user = null;

            using (IUnitOfWork uow = unityOfWorkFactory.CreateUnitOfWork())
            {
                var salt = cryptoService.CreateSalt();

                user = new BursifyUser();

            if (existingUser != null)
            {
                throw new Exception("Email is already in use");
            }
                user.Email = userEmail;
                user.Name = username;
                user.PasswordHash = cryptoService.HashPassword(password, salt);
                user.PasswordSalt = salt;
                user.UserType = userType;
                user.RegistrationDate = DateTime.UtcNow;

                userRepository.Save(user);

            using (IUnitOfWork uow = unitOfWorkFactory.CreateUnitOfWork())
            { 
                var salt = cryptoService.CreateSalt();

                user = new BursifyUser
                {
                    Email = userEmail,
                    Name = username,
                    PasswordHash = cryptoService.HashPassword(password, salt),
                    PasswordSalt = salt,
                    UserType = userType,
                    RegistrationDate = DateTime.UtcNow
                };

                userRepository.Save(user);
                uow.Commit();
            }
            return user;
        }


        private bool isPasswordValid(BursifyUser user, string password)
        {
            return cryptoService.HashPassword(password, user.PasswordSalt) == user.PasswordHash;
        }
    }

}