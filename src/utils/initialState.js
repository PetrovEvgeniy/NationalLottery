const initialState = {
    gameRunning: false,
    failedAttempts: 0,
    sphereIndex: 0,
    lastNumber: null,
    direction: 'none',
    directionModalVisible: false,
    summaryModalVisible: false,
    spheresData: [
        {currentStatus: 'init', value: '', money: 5000},
        {currentStatus: 'init', value: '', money: 10000},
        {currentStatus: 'init', value: '', money: 15000},
        {currentStatus: 'init', value: '', money: 20000},
        {currentStatus: 'init', value: '', money: 25000},
        {currentStatus: 'init', value: '', money: 30000},
        {currentStatus: 'init', value: '', money: 50000},
        {currentStatus: 'init', value: '', money: 100000},
        {currentStatus: 'init', value: '', money: 150000},
        {currentStatus: 'init', value: '', money: 200000},
    ],
    blacklistedNumbers: [],
    earnedMoney: 0
}

module.exports = initialState;