using System;

namespace Intempio.Meetings.Home.Util
{
    public interface IWritableOptions<out T> : Microsoft.Extensions.Options.IOptions<T> where T : class, new()
    {
        void Update(Action<T> applyChanges);
    }
}
