import pandas as pd
import numpy as np

def main():
    # supply_df = pd.read_csv("../data/io_tables/CommoditySupply.csv", on_bad_lines='skip', header=3, index_col="Name")
    # print(supply_df.head(5))
    # supply_df = supply_df.drop(columns=["Unnamed: 0", "Total Commodity Output", "Imports", "CIF/FOB Adjustments on Imports", "Total product supply (basic prices)", "Trade margins", "Transport margins","Total trade and transportation margins", "Import duties", "Tax on products", "Subsidies on products", "Total tax less subsidies on products", "Total product supply (purchaser prices)"])
    # print(supply_df.head(5))
    # print(supply_df.idxmax(axis="columns"))
    # print(supply_df.apply(lambda s: s.abs().nlargest(3).index.tolist(), axis=1))

    use_df = pd.read_csv("../data/io_tables/CommodityUse.csv", on_bad_lines='skip', header=3, index_col="Name")
    use_df = use_df.drop(columns=[
        "Unnamed: 0", "Total Intermediate", "Personal consumption expenditures", "Nonresidential private fixed investment in equipment", "Nonresidential private fixed investment in intellectual property products", "Residential private fixed investment", "Nonresidential private fixed investment in structures", "Change in private inventories", "Exports of goods and services", "National defense: Consumption expenditures", "Federal national defense: Gross investment in equipment", "Federal national defense: Gross investment in intellectual property products", "Federal national defense: Gross investment in structures", "Nondefense: Consumption expenditures", "Federal nondefense: Gross investment in equipment", "Federal nondefense: Gross investment in intellectual property products", "Federal nondefense: Gross investment in structures", "State and local government consumption expenditures", "State and local: Gross investment in equipment", "State and local: Gross investment in intellectual property products", "State and local: Gross investment in structures", "Total use of products"
        ])
    use_df.idxmax(axis="columns").to_csv("../data/io_tables/TopCommodityUse.csv")







if __name__ == "__main__":
    main()