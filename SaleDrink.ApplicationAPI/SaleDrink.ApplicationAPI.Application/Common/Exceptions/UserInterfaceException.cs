using System;

namespace SaleDrink.ApplicationAPI.Application.Common.Exceptions
{

    [Serializable]
    public class UserInterfaceException : Exception
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string UIMessage { get; set; }
        public UserInterfaceException() { }
        public UserInterfaceException(string message) : base(message) { }
        public UserInterfaceException(string message, Exception inner) : base(message, inner) { }
        public UserInterfaceException(string message, string uiMessage) : base(message)
        {
            this.UIMessage = uiMessage;
        }
        public UserInterfaceException(string message, string uiMessage, Exception inner) : base(message, inner) 
        {
            this.UIMessage = uiMessage;

        }
        protected UserInterfaceException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
