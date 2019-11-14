using AutoMapper;
using stackl.Models;
using stackl.Models.Users;

namespace stackl.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<StacklUser, UserModel>();
            CreateMap<RegisterModel, StacklUser>();
            CreateMap<UpdateModel, StacklUser>();
        }
    }
}