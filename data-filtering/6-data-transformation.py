import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# Load the data from the CSV file
data = pd.read_csv("nutrition-5.csv")

# Select the specified columns
selected_columns = [
    "id",
    "name",
    "carbohydrate",
    "total_fat",
    "cholesterol",
    "protein",
    "fiber",
    "sugars",
]
filtered_data = data[selected_columns]

# Initialize the MinMaxScaler with feature range (-1, 1)
scaler = MinMaxScaler(feature_range=(-1, 1))

# Apply the scaler to the selected columns except 'id' and 'name'
columns_to_scale = [
    "carbohydrate",
    "total_fat",
    "cholesterol",
    "protein",
    "fiber",
    "sugars",
]
filtered_data.loc[:, columns_to_scale] = scaler.fit_transform(
    filtered_data[columns_to_scale]
)

# Display the filtered data
filtered_data.to_csv("nutrition-6.csv", index=False)
