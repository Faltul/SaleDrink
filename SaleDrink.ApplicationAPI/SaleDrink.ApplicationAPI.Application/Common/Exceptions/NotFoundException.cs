using System;
using Newtonsoft.Json;

namespace SaleDrink.ApplicationAPI.Application.Common.Exceptions
{

    [Serializable]
    public class NotFoundException : UserInterfaceException
    {
        public NotFoundException(string name, object key)
            : base($"Entity \"{name}\" ({key}) was not found.","Объект не найден")
        {
        }

        public NotFoundException(string name, object key, string uiMessage)
            : base($"Entity \"{name}\" ({JsonConvert.SerializeObject(key)}) was not found.", uiMessage)
        {
        }
    }
}
