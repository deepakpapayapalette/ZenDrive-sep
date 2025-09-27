import React from 'react'

const VehicleStatusCard = () => {
    const statusData = [
    {
      title: 'KM Covered',
      value: '27,202 KM',
      status: null,
      statusColor: null
    },
    {
      title: 'Last Service',
      value: '25-12-2025',
      status: null,
      statusColor: null
    },
    {
      title: 'Next Service Due',
      value: '25-12-2025',
      status: null,
      statusColor: null
    },
    {
      title: 'No. Of Challan',
      value: '120',
      status: null,
      statusColor: null
    },
    {
      title: 'No. Of Accidents',
      value: '120',
      status: null,
      statusColor: null
    },
    {
      title: 'Light and Indicators',
      value: null,
      status: 'Suspended',
      statusColor: 'yellow'
    },
    {
      title: 'Wheel Balancing',
      value: null,
      status: 'Inactive',
      statusColor: 'red'
    },
    {
      title: 'Alignment',
      value: null,
      status: 'Inactive',
      statusColor: 'red'
    },
    {
      title: 'Seat Belts and Airbags',
      value: null,
      status: 'Inactive',
      statusColor: 'red'
    },
    {
      title: 'Engine',
      value: null,
      status: 'Active',
      statusColor: 'yellow'
    },
    {
      title: 'Brakes',
      value: null,
      status: 'Suspended',
      statusColor: 'yellow'
    },
    {
      title: 'Tyres',
      value: null,
      status: 'Inactive',
      statusColor: 'red'
    },
    {
      title: 'Transmission',
      value: null,
      status: 'Active',
      statusColor: 'yellow'
    },
    {
      title: 'Suspension System',
      value: null,
      status: 'Active',
      statusColor: 'yellow'
    },
    {
      title: 'Engine',
      value: null,
      status: 'Inactive',
      statusColor: 'red'
    }
  ];

  const getStatusColor = (color) => {
    switch (color) {
      case 'red':
        return 'text-red-500';
      case 'yellow':
        return 'text-yellow-500';
      case 'green':
        return 'text-green-500';
      default:
        return '';
    }
  };

  const getStatusDotColor = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'green':
        return 'bg-green-500';
      default:
        return '';
    }
  };
  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {statusData.slice(0, 6).map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-2">{item.title}</div>
            {item.value ? (
              <div className="text-lg font-semibold text-gray-900">{item.value}</div>
            ) : (
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusDotColor(item.statusColor)}`}></span>
                <span className={`text-sm font-medium ${getStatusColor(item.statusColor)}`}>
                  {item.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Component Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {statusData.slice(6, 12).map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-2">{item.title}</div>
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusDotColor(item.statusColor)}`}></span>
              <span className={`text-sm font-medium ${getStatusColor(item.statusColor)}`}>
                <h4 className='text-gray-950 text-lg font-semibold'>  {item.status}  </h4>
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statusData.slice(12).map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-2">{item.title}</div>
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusDotColor(item.statusColor)}`}></span>
              <span className={`text-sm font-medium ${getStatusColor(item.statusColor)}`}>
                <h4 className='text-gray-950 text-lg font-semibold'>{item.status}</h4>
              </span>
            </div>
          </div>
        ))}

        {/* Insurance Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-2">Insurance Status</div>
          <div className="flex items-center mb-1">
            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500"></span>
            <span className="text-gray-950 text-lg font-semibold">Active</span>
          </div>
          <div className="text-xs text-gray-500">Expiry Date : 20-12-2025</div>
        </div>

        {/* Fitness Certificate Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-2">Fitness Certificate Status</div>
          <div className="flex items-center mb-1">
            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500"></span>
            <span className="text-gray-950 text-lg font-semibold">Active</span>
          </div>
          <div className="text-xs text-gray-500">Expiry Date : 20-12-2025</div>
        </div>
      </div>
    </>
  )
}

export default VehicleStatusCard

