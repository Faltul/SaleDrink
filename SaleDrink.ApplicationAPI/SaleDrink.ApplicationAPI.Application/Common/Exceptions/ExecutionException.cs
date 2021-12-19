using System;

namespace SaleDrink.ApplicationAPI.Application.Common.Exceptions
{
    [Serializable]
    public class ExecutionException : UserInterfaceException
    {
        public ExecutionException() { }
        public ExecutionException(string message) : base(message, "Ошибка выполнения запроса") { }
        public ExecutionException(string message, Exception inner) : base(message, "Ошибка выполнения запроса", inner) { }
        public ExecutionException(string message, string uiMessage) : base(message, uiMessage) { }
        public ExecutionException(string message, string uiMessage, Exception inner) : base(message, uiMessage, inner) { }
        protected ExecutionException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
