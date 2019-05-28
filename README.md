# Data Visualization Challenge: Visualize Inequality

This is the code for the submission to the *United Nations Development Programme* _Human Development Reports_ [Data Visualization Challenge](http://hdr.undp.org/en/data-visualization-challenge-2019).

## [income-inequality.info](http://income-inequality.info)

The code in this repository was used to process all the data and create all the charts for the _income-inequality.info_ website.

All the website's files are located in another GitHub repository: [Income-Inequality](https://github.com/whyboris/income-inequality.info)

To report errors, ask questions, or offer corrections, please use the _Issues_ section on this or the other repository.

### Notes

I tried to document my steps and processing. Please let me know if you'd like me to clarify, elaborate, or better-organize this repository.

There were very few steps I had to perform manually (without running a script), primarily cleaning the _.csv_ file headers for the _Pandas_ library to be able to read the files. Another manual step was dealing with the data for China, which was split into two categories: _urban_ and _rural_. Only four countries had to be removed from the original dataset before the final export (there was trouble with PPP conversion).

## Preview

![Income Inequality](https://raw.githubusercontent.com/whyboris/income-inequality.info/master/images/7.png)
