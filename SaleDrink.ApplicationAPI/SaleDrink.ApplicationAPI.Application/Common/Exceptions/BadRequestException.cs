using System;

namespace SaleDrink.ApplicationAPI.Application.Common.Exceptions
{

    [Serializable]
    public class BadRequestException : UserInterfaceException
    {
        public BadRequestException() { }
        public BadRequestException(string message) : base(message,"Некорректный запрос") { }
        public BadRequestException(string message, Exception inner) : base(message, inner) { }
        public BadRequestException(string message, string uiMessage) : base(message, uiMessage) { }
        public BadRequestException(string message, string uiMessage, Exception inner) : base(message, uiMessage, inner) { }
        protected BadRequestException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
