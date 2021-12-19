namespace SaleDrink.ApplicationAPI.WebAPI.Models.Response
{
    public class ResponseContract<T>
    {
        public bool Result { get; set; }
        public T Data { get; set; }
        public ErrorContract Error { get; set; }
    }
}
