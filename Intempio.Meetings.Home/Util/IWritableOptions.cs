using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intempio.Meetings.Home.Util
{
    public interface IWritableOptions<out T> : Microsoft.Extensions.Options.IOptions<T> where T : class, new()
    {
        void Update(Action<T> applyChanges);
    }
}
